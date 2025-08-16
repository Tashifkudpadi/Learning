"""Add foreign key in posts table

Revision ID: 08c549479d80
Revises: e3bdf4ebf28a
Create Date: 2025-08-14 16:59:35.307431

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '08c549479d80'
down_revision: Union[str, Sequence[str], None] = 'e3bdf4ebf28a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
