from datetime import datetime
from typing import Any

from sqlalchemy import (
    String,
    DateTime,
    Integer,
    ForeignKey,
    Text
)
from sqlalchemy.dialects.postgresql import JSONB

from sqlalchemy.orm import (
    Mapped,
    mapped_column
)

from app.db.base import Base
from app.models.user import User  # noqa: F401


class MedicalReport(Base):
    __tablename__ = "medical_reports"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE")
    )

    file_name: Mapped[str] = mapped_column(
        String(255)
    )

    original_file_path: Mapped[str] = mapped_column(
        String(500)
    )

    report_type: Mapped[str] = mapped_column(
        String(50)
    )

    mime_type: Mapped[str] = mapped_column(
        String(100)
    )

    file_size: Mapped[int] = mapped_column(
        Integer
    )

    ocr_text: Mapped[str] = mapped_column(
        Text,
        nullable=True
    )

    analysis_status: Mapped[str] = mapped_column(
        String(30),
        default="pending"
    )

    analysis_result: Mapped[dict[str, Any] | None] = mapped_column(
        JSONB,
        nullable=True
    )

    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    stored_file_name: Mapped[str] = mapped_column(
        String(255)
    )
