from sqlalchemy import Column, Integer, String, Boolean
from . import Base

class Alert(Base):
    __tablename__ = 'alerts'

    id = Column(Integer, primary_key=True, index=True)
    message = Column(String)
    is_active = Column(Boolean, default=True)