import logging
import os
from logging.handlers import RotatingFileHandler

def setup_logger(app):
    """Configure application logging"""
    
    # Create logs directory if it doesn't exist
    if not os.path.exists('logs'):
        os.makedirs('logs')

    # Set up file handler for error logging
    error_handler = RotatingFileHandler(
        'logs/error.log',
        maxBytes=10240000,  # 10MB
        backupCount=10
    )
    error_handler.setLevel(logging.ERROR)
    error_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))

    # Set up file handler for info logging
    info_handler = RotatingFileHandler(
        'logs/info.log',
        maxBytes=10240000,  # 10MB
        backupCount=10
    )
    info_handler.setLevel(logging.INFO)
    info_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s'
    ))

    # Add handlers to the application logger
    app.logger.addHandler(error_handler)
    app.logger.addHandler(info_handler)
    app.logger.setLevel(logging.INFO)

    app.logger.info('Crypto Portfolio Tracker startup')
