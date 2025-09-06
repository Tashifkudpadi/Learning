"""add batches with associations

Revision ID: e29dbe021ca6
Revises: 592a8a9b84f6
Create Date: 2025-09-07 00:08:54.319263

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e29dbe021ca6'
down_revision: Union[str, Sequence[str], None] = '592a8a9b84f6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    # Batches table
    op.create_table(
        'batches',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('start_date', sa.Date(), nullable=False),
        sa.Column('end_date', sa.Date(), nullable=False),
        sa.Column('num_learners', sa.Integer(), nullable=False, default=0),
    )

    # Association table: batch_students
    op.create_table(
        'batch_students',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('batch_id', sa.Integer(), sa.ForeignKey(
            'batches.id', ondelete="CASCADE")),
        sa.Column('student_id', sa.Integer(), sa.ForeignKey(
            'students.id', ondelete="CASCADE")),
    )

    # Association table: batch_faculties
    op.create_table(
        'batch_faculties',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('batch_id', sa.Integer(), sa.ForeignKey(
            'batches.id', ondelete="CASCADE")),
        sa.Column('faculty_id', sa.Integer(), sa.ForeignKey(
            'faculties.id', ondelete="CASCADE")),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('batch_faculties')
    op.drop_table('batch_students')
    op.drop_table('batches')
