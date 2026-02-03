from __future__ import annotations
from sqlalchemy import String, ForeignKey, UniqueConstraint, Numeric
from sqlalchemy.orm import Mapped, mapped_column
from apps.core.db.base import Base

class ARInvoice(Base):
    __tablename__ = "ar_invoice"
    __table_args__ = (UniqueConstraint("legal_entity_id", "source", "source_id", name="uq_ar_invoice_source"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    legal_entity_id: Mapped[int] = mapped_column(ForeignKey("legal_entity.id", ondelete="CASCADE"), index=True)

    source: Mapped[str] = mapped_column(String(20), default="odoo")
    source_id: Mapped[str] = mapped_column(String(64), index=True)
    number: Mapped[str | None] = mapped_column(String(64), nullable=True, index=True)

    customer_party_id: Mapped[int | None] = mapped_column(ForeignKey("party.id"), nullable=True)

    status: Mapped[str] = mapped_column(String(30), default="draft", index=True)
    invoice_date: Mapped[str | None] = mapped_column(String(20), nullable=True)
    due_date: Mapped[str | None] = mapped_column(String(20), nullable=True)

    currency: Mapped[str | None] = mapped_column(String(10), nullable=True)
    total: Mapped[float | None] = mapped_column(Numeric(12, 2), nullable=True)
    amount_due: Mapped[float | None] = mapped_column(Numeric(12, 2), nullable=True)

class APBill(Base):
    __tablename__ = "ap_bill"
    __table_args__ = (UniqueConstraint("legal_entity_id", "source", "source_id", name="uq_ap_bill_source"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    legal_entity_id: Mapped[int] = mapped_column(ForeignKey("legal_entity.id", ondelete="CASCADE"), index=True)

    source: Mapped[str] = mapped_column(String(20), default="odoo")
    source_id: Mapped[str] = mapped_column(String(64), index=True)

    vendor_party_id: Mapped[int | None] = mapped_column(ForeignKey("party.id"), nullable=True)

    status: Mapped[str] = mapped_column(String(30), default="draft", index=True)
    bill_date: Mapped[str | None] = mapped_column(String(20), nullable=True)
    due_date: Mapped[str | None] = mapped_column(String(20), nullable=True)

    currency: Mapped[str | None] = mapped_column(String(10), nullable=True)
    total: Mapped[float | None] = mapped_column(Numeric(12, 2), nullable=True)
    amount_due: Mapped[float | None] = mapped_column(Numeric(12, 2), nullable=True)
