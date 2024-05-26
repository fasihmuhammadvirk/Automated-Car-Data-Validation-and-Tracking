"""Create car_record

Revision ID: f36abf0fe554
Revises: ae5b4879c97d
Create Date: 2024-05-12 02:08:28.298892

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f36abf0fe554'
down_revision: Union[str, None] = 'ae5b4879c97d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
