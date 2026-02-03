from __future__ import annotations
from sqlalchemy import String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from apps.core.db.base import Base

class Party(Base):
    __tablename__ = "party"

    id: Mapped[int] = mapped_column(primary_key=True)
    legal_entity_id: Mapped[int] = mapped_column(ForeignKey("legal_entity.id", ondelete="CASCADE"), index=True)
    party_type: Mapped[str] = mapped_column(String(30), index=True)
    display_name: Mapped[str] = mapped_column(String(255), index=True)

    identifiers: Mapped[list["PartyIdentifier"]] = relationship(back_populates="party", cascade="all, delete-orphan")

class PartyIdentifier(Base):
    __tablename__ = "party_identifier"
    __table_args__ = (UniqueConstraint("id_type", "id_value", name="uq_party_identifier_type_value"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    party_id: Mapped[int] = mapped_column(ForeignKey("party.id", ondelete="CASCADE"), index=True)
    id_type: Mapped[str] = mapped_column(String(50), index=True)
    id_value: Mapped[str] = mapped_column(String(255), index=True)

    party: Mapped["Party"] = relationship(back_populates="identifiers")
