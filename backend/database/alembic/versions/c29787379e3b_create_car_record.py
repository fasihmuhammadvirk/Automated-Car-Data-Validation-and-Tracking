"""Create car_record

Revision ID: c29787379e3b
Revises: f36abf0fe554
Create Date: 2024-05-12 02:21:25.375635

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c29787379e3b'
down_revision: Union[str, None] = 'f36abf0fe554'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
