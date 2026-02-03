from __future__ import annotations
from sqlalchemy import String, Boolean, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from apps.core.db.base import Base

class LegalEntity(Base):
    __tablename__ = "legal_entity"

    id: Mapped[int] = mapped_column(primary_key=True)
    canonical_name: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    odoo_company_id: Mapped[str | None] = mapped_column(String(64), nullable=True)

    brands: Mapped[list["Brand"]] = relationship(back_populates="legal_entity", cascade="all, delete-orphan")

class Brand(Base):
    __tablename__ = "brand"
    __table_args__ = (UniqueConstraint("legal_entity_id", "brand_name", name="uq_brand_entity_name"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    legal_entity_id: Mapped[int] = mapped_column(ForeignKey("legal_entity.id", ondelete="CASCADE"), index=True)
    brand_name: Mapped[str] = mapped_column(String(255), index=True)
    brand_type: Mapped[str] = mapped_column(String(50), default="DBA")

    legal_entity: Mapped["LegalEntity"] = relationship(back_populates="brands")
