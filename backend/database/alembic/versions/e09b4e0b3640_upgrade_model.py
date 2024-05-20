"""upgrade_model

Revision ID: e09b4e0b3640
Revises: 24d275e06a50
Create Date: 2024-05-18 18:59:45.404151

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e09b4e0b3640'
down_revision: Union[str, None] = '24d275e06a50'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
