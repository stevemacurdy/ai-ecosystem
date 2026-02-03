from sqlalchemy.orm import Session
from apps.connectors.odoo.client import OdooClient, get_config
from apps.core.models import Party, PartyIdentifier, ARInvoice, APBill, LegalEntity

def _default_entity(db: Session) -> LegalEntity:
    ent = db.query(LegalEntity).filter(LegalEntity.canonical_name == "WOULF Group").one_or_none()
    return ent or db.query(LegalEntity).order_by(LegalEntity.id.asc()).first()

def sync_partners(db: Session, limit: int = 200):
    client = OdooClient(get_config())
    entity = _default_entity(db)

    partners = client.search_read(
        "res.partner",
        domain=[("active", "=", True)],
        fields=["id", "name", "email", "phone", "is_company"],
        limit=limit,
        order="id asc",
    )

    for p in partners:
        display = p.get("name") or "Unknown"
        party = Party(
            legal_entity_id=entity.id,
            party_type="org" if p.get("is_company") else "person",
            display_name=display,
        )
        db.add(party)
        db.flush()

        db.add(PartyIdentifier(party_id=party.id, id_type="odoo_partner_id", id_value=str(p["id"])))

        if p.get("email"):
            db.add(PartyIdentifier(party_id=party.id, id_type="email", id_value=p["email"].strip().lower()))
        if p.get("phone"):
            db.add(PartyIdentifier(party_id=party.id, id_type="phone", id_value=str(p["phone"]).strip()))

    db.commit()
    return {"partners_synced": len(partners)}

def sync_invoices_and_bills(db: Session, limit: int = 200):
    client = OdooClient(get_config())
    entity = _default_entity(db)

    moves = client.search_read(
        "account.move",
        domain=[("state", "in", ["draft", "posted"])],
        fields=["id", "move_type", "name", "invoice_date", "invoice_date_due", "amount_total", "amount_residual", "currency_id"],
        limit=limit,
        order="id asc",
    )

    ar_count = 0
    ap_count = 0

    for m in moves:
        move_type = m.get("move_type")
        currency = None
        if m.get("currency_id") and isinstance(m["currency_id"], list) and len(m["currency_id"]) > 1:
            currency = m["currency_id"][1]

        row_common = dict(
            legal_entity_id=entity.id,
            source="odoo",
            source_id=str(m["id"]),
            status="posted",
            currency=currency,
            total=float(m.get("amount_total") or 0),
            amount_due=float(m.get("amount_residual") or 0),
        )

        if move_type in ("out_invoice", "out_refund"):
            db.merge(ARInvoice(
                **row_common,
                number=m.get("name"),
                invoice_date=str(m.get("invoice_date")) if m.get("invoice_date") else None,
                due_date=str(m.get("invoice_date_due")) if m.get("invoice_date_due") else None,
            ))
            ar_count += 1

        if move_type in ("in_invoice", "in_refund"):
            db.merge(APBill(
                **row_common,
                bill_date=str(m.get("invoice_date")) if m.get("invoice_date") else None,
                due_date=str(m.get("invoice_date_due")) if m.get("invoice_date_due") else None,
            ))
            ap_count += 1

    db.commit()
    return {"ar_invoices_synced": ar_count, "ap_bills_synced": ap_count}
