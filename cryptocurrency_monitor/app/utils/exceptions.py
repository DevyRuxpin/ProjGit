class CryptoPortfolioException(Exception):
    """Base exception for the application"""
    pass

class ValidationError(CryptoPortfolioException):
    """Raised when validation fails"""
    pass

class APIConnectionError(CryptoPortfolioException):
    """Raised when external API connection fails"""
    pass

class DatabaseError(CryptoPortfolioException):
    """Raised when database operations fail"""
    pass

class AuthenticationError(CryptoPortfolioException):
    """Raised when authentication fails"""
    pass

class RateLimitError(CryptoPortfolioException):
    """Raised when rate limit is exceeded"""
    pass
