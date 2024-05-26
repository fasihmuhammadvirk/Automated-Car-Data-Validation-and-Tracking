"""Car Record Model Modification

Revision ID: a5825750168c
Revises: c29787379e3b
Create Date: 2024-05-18 17:21:42.137359

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a5825750168c'
down_revision: Union[str, None] = 'c29787379e3b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
