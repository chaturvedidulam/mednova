"""add analysis result to medical reports

Revision ID: 5f2a8c91d7b0
Revises: 3e0f180b041a
Create Date: 2026-07-04 20:15:00.000000

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = '5f2a8c91d7b0'
down_revision: Union[str, Sequence[str], None] = '3e0f180b041a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute(
        "ALTER TABLE medical_reports "
        "ADD COLUMN IF NOT EXISTS analysis_result JSONB"
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.execute(
        "ALTER TABLE medical_reports "
        "DROP COLUMN IF EXISTS analysis_result"
    )
