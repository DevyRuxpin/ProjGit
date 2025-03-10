import logging
from functools import wraps
from flask import jsonify
from werkzeug.exceptions import HTTPException

# Configure logging
logging.basicConfig(
    filename='app.log',
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class APIError(Exception):
    """Base exception class for API errors"""
    def __init__(self, message, status_code=400, payload=None):
        super().__init__()
        self.message = message
        self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        rv['status'] = 'error'
        return rv

def handle_error(error):
    """Generic error handler for all exceptions"""
    if isinstance(error, APIError):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        logger.error(f"API Error: {error.message}", exc_info=True)
    elif isinstance(error, HTTPException):
        response = jsonify({
            'status': 'error',
            'message': error.description,
        })
        response.status_code = error.code
        logger.error(f"HTTP Exception: {error.description}", exc_info=True)
    else:
        response = jsonify({
            'status': 'error',
            'message': 'An unexpected error occurred'
        })
        response.status_code = 500
        logger.error("Unexpected error", exc_info=True)
    
    return response

def error_handler(f):
    """Decorator to handle errors in routes"""
    @wraps(f)
    def wrapped(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            return handle_error(e)
    return wrapped
