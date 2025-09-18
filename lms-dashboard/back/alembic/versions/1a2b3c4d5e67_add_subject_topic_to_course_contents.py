"""add subject_id and topic_id to course_contents

Revision ID: 1a2b3c4d5e67
Revises: ed0ea491a939
Create Date: 2025-09-12 10:15:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '1a2b3c4d5e67'
down_revision: Union[str, Sequence[str], None] = 'ed0ea491a939'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add columns as nullable to avoid issues with existing rows. New API enforces required values.
    op.add_column('course_contents', sa.Column('subject_id', sa.Integer(), nullable=True))
    op.add_column('course_contents', sa.Column('topic_id', sa.Integer(), nullable=True))
    # Create foreign keys
    op.create_foreign_key(
        'fk_course_contents_subject_id_subjects',
        'course_contents', 'subjects', ['subject_id'], ['id'], ondelete=None
    )
    op.create_foreign_key(
        'fk_course_contents_topic_id_topics',
        'course_contents', 'topics', ['topic_id'], ['id'], ondelete=None
    )


def downgrade() -> None:
    # Drop foreign keys then columns
    op.drop_constraint('fk_course_contents_topic_id_topics', 'course_contents', type_='foreignkey')
    op.drop_constraint('fk_course_contents_subject_id_subjects', 'course_contents', type_='foreignkey')
    op.drop_column('course_contents', 'topic_id')
    op.drop_column('course_contents', 'subject_id')
