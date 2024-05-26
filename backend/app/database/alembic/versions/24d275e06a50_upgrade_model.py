"""upgrade_model

Revision ID: 24d275e06a50
Revises: 327f9f976d0f
Create Date: 2024-05-18 18:59:17.433472

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '24d275e06a50'
down_revision: Union[str, None] = '327f9f976d0f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
