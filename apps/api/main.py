from fastapi import FastAPI

app = FastAPI(title="AI Ecosystem API")

@app.get("/health")
def health():
    return {"status": "ok"}

from fastapi import FastAPI
from apps.worker.tasks import sync_odoo_partners, sync_odoo_finance

app = FastAPI(title="AI Ecosystem API")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/sync/odoo/partners")
def trigger_partner_sync():
    job = sync_odoo_partners.delay()
    return {"task_id": job.id}

@app.post("/sync/odoo/finance")
def trigger_finance_sync():
    job = sync_odoo_finance.delay()
    return {"task_id": job.id}
