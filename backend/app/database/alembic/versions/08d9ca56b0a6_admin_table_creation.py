"""Admin Table Creation

Revision ID: 08d9ca56b0a6
Revises: bd8cab4608c5
Create Date: 2024-05-18 18:41:51.422247

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '08d9ca56b0a6'
down_revision: Union[str, None] = 'bd8cab4608c5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
