"""Admin Table Creation

Revision ID: bd8cab4608c5
Revises: df7a9d0428e3
Create Date: 2024-05-18 18:19:20.563294

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bd8cab4608c5'
down_revision: Union[str, None] = 'df7a9d0428e3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
