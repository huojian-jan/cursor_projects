# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.base_class import Base  # noqa
from app.models.user import User  # noqa
from app.models.book import Book  # noqa
from app.models.borrow_record import BorrowRecord  # noqa 