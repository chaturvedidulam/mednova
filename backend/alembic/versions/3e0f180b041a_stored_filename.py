"""stored filename

Revision ID: 3e0f180b041a
Revises: a2aff67ecb6b
Create Date: 2026-07-04 18:42:24.417487

"""
from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = '3e0f180b041a'
down_revision: Union[str, Sequence[str], None] = 'a2aff67ecb6b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute(
        "ALTER TABLE medical_reports "
        "ADD COLUMN IF NOT EXISTS stored_file_name VARCHAR(255)"
    )
    op.execute(
        "UPDATE medical_reports "
        "SET stored_file_name = file_name "
        "WHERE stored_file_name IS NULL"
    )
    op.alter_column('medical_reports', 'stored_file_name', nullable=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('medical_reports', 'stored_file_name')
