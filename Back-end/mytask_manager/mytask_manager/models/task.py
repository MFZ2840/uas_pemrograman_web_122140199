from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .meta import Base

class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True)
    title = Column(String(100), nullable=False)
    details = Column(String(255))
    due_date = Column(Date)
    is_done = Column(Boolean, default=False)
    category_id = Column(Integer, ForeignKey('categories.id'))

    category = relationship("Category", backref="tasks")
    user_id = Column(Integer, nullable=False)