"""Car Record Model Modification

Revision ID: df7a9d0428e3
Revises: a5825750168c
Create Date: 2024-05-18 18:09:07.458277

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'df7a9d0428e3'
down_revision: Union[str, None] = 'a5825750168c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
