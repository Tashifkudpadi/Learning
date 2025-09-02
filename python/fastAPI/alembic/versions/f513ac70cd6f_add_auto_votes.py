"""Add auto- votes

Revision ID: f513ac70cd6f
Revises: d64953f0797b
Create Date: 2025-08-27 00:02:23.044633

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'f513ac70cd6f'
down_revision: Union[str, Sequence[str], None] = 'd64953f0797b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table('votes',
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('post_id', sa. Integer(), nullable=False),
                    sa.ForeignKeyConstraint(
                        ['post_id'], ['posts.id'], ondelete='CASCADE'),
                    sa.ForeignKeyConstraint(
                        ['user_id'], ['users.id'], ondelete='CASCADE'),
                    sa. PrimaryKeyConstraint('user_id', 'post_id')
                    )


def downgrade():
    op.drop_table('votes')
