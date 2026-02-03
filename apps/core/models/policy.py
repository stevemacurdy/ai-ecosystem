from __future__ import annotations
from sqlalchemy import String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from apps.core.db.base import Base

class SourceCompanyPolicy(Base):
    __tablename__ = "source_company_policy"
    __table_args__ = (UniqueConstraint("source_system", "source_company_name", name="uq_source_company_policy"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    source_system: Mapped[str] = mapped_column(String(20), default="odoo")
    source_company_name: Mapped[str] = mapped_column(String(255), index=True)

    legal_entity_id: Mapped[int | None] = mapped_column(ForeignKey("legal_entity.id"), nullable=True)
    policy: Mapped[str] = mapped_column(String(40), default="UNKNOWN_REVIEW")
