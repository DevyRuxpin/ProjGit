from flask import jsonify
from datetime import datetime

class APIResponse:
    @staticmethod
    def success(data=None, message=None, status_code=200):
        """Format successful API response"""
        response = {
            'status': 'success',
            'timestamp': datetime.utcnow().isoformat()
        }
        if message:
            response['message'] = message
        if data is not None:
            response['data'] = data
        return jsonify(response), status_code

    @staticmethod
    def error(message, status_code=400, errors=None):
        """Format error API response"""
        response = {
            'status': 'error',
            'message': message,
            'timestamp': datetime.utcnow().isoformat()
        }
        if errors:
            response['errors'] = errors
        return jsonify(response), status_code
