"""Admin Table Creation

Revision ID: 327f9f976d0f
Revises: 08d9ca56b0a6
Create Date: 2024-05-18 18:56:26.612317

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '327f9f976d0f'
down_revision: Union[str, None] = '08d9ca56b0a6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
