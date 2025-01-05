from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# Import your models here
from .query_metric import QueryMetric
from .alert import Alert