import os
from datetime import timedelta

class Config:
    # Use Render's environment variables
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-key'
    
    # Database configuration (Render provides DATABASE_URL)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    if SQLALCHEMY_DATABASE_URI and SQLALCHEMY_DATABASE_URI.startswith("postgres://"):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace("postgres://", "postgresql://", 1)
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Redis configuration (Render provides REDIS_URL)
    REDIS_URL = os.environ.get('REDIS_URL')
    
    # JWT configuration
    JWT_SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    
    # API Keys
    COINGECKO_API_KEY = os.environ.get('COINGECKO_API_KEY')
    
    # Allowed origins for CORS
    ALLOWED_ORIGINS = os.environ.get('ALLOWED_ORIGINS', '*').split(',')
