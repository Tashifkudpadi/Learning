"""add content column to posts table

Revision ID: af5e7ea06e6f
Revises: 7b85f6fb21c7
Create Date: 2025-08-14 16:12:45.985491

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'af5e7ea06e6f'
down_revision: Union[str, Sequence[str], None] = '7b85f6fb21c7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('posts', sa.Column('content', sa.String(), nullable=False))
    pass


def downgrade() -> None:
    op.drop_column('posts', 'content')
    pass
