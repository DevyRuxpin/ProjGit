from functools import wraps
from flask import request, abort

def api_version(version):
    """Decorator to handle API versioning"""
    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            request_version = request.headers.get('Accept-Version', '1.0')
            if request_version != version:
                abort(406, f"API version {request_version} is not supported")
            return f(*args, **kwargs)
        return wrapped
    return decorator
