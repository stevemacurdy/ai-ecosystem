from apps.worker.celery_app import celery_app
from apps.core.db.session import SessionLocal
from apps.connectors.odoo.sync import sync_partners, sync_invoices_and_bills

@celery_app.task(name="apps.worker.tasks.sync_odoo_partners")
def sync_odoo_partners():
    db = SessionLocal()
    try:
        return sync_partners(db)
    finally:
        db.close()

@celery_app.task(name="apps.worker.tasks.sync_odoo_finance")
def sync_odoo_finance():
    db = SessionLocal()
    try:
        return sync_invoices_and_bills(db)
    finally:
        db.close()
