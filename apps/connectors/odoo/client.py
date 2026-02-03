import os
import xmlrpc.client
from dataclasses import dataclass

@dataclass
class OdooConfig:
    url: str
    db: str
    login: str
    api_key: str

def get_config() -> OdooConfig:
    return OdooConfig(
        url=os.environ["ODOO_URL"].rstrip("/"),
        db=os.environ["ODOO_DB"],
        login=os.environ["ODOO_LOGIN"],
        api_key=os.environ["ODOO_API_KEY"],
    )

class OdooClient:
    def __init__(self, cfg: OdooConfig):
        self.cfg = cfg
        self.common = xmlrpc.client.ServerProxy(f"{cfg.url}/xmlrpc/2/common")
        self.uid = self.common.authenticate(cfg.db, cfg.login, cfg.api_key, {})
        if not self.uid:
            raise RuntimeError("Odoo authentication failed (check ODOO_* env vars)")

        self.models = xmlrpc.client.ServerProxy(f"{cfg.url}/xmlrpc/2/object")

    def search_read(self, model: str, domain, fields, limit=100, offset=0, order=None):
        kwargs = {"fields": fields, "limit": limit, "offset": offset}
        if order:
            kwargs["order"] = order
        return self.models.execute_kw(
            self.cfg.db, self.uid, self.cfg.api_key,
            model, "search_read",
            [domain], kwargs
        )
