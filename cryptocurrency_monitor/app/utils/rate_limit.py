from flask import request
from functools import wraps
import time
from collections import defaultdict

class RateLimit:
    def __init__(self, calls=100, period=60):
        self.calls = calls  # Number of calls allowed
        self.period = period  # Time period in seconds
        self.users = defaultdict(list)  # Store user requests

    def is_allowed(self, user_id):
        """Check if request is allowed"""
        current = time.time()
        user_requests = self.users[user_id]
        
        # Remove old requests
        while user_requests and user_requests[0] <= current - self.period:
            user_requests.pop(0)
        
        # Check if user has exceeded rate limit
        if len(user_requests) >= self.calls:
            return False
        
        # Add new request
        user_requests.append(current)
        return True

def rate_limit(calls=100, period=60):
    """Rate limiting decorator"""
    limiter = RateLimit(calls, period)
    
    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            user_id = request.headers.get('X-API-Key', request.remote_addr)
            
            if not limiter.is_allowed(user_id):
                return {
                    'status': 'error',
                    'message': 'Rate limit exceeded'
                }, 429
            
            return f(*args, **kwargs)
        return wrapped
    return decorator
