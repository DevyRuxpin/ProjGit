from decimal import Decimal
from .exceptions import ValidationError

class Validator:
    @staticmethod
    def validate_cryptocurrency(symbol):
        """Validate cryptocurrency symbol"""
        if not isinstance(symbol, str):
            raise ValidationError("Cryptocurrency symbol must be a string")
        if not symbol.strip():
            raise ValidationError("Cryptocurrency symbol cannot be empty")
        return symbol.strip().lower()

    @staticmethod
    def validate_quantity(quantity):
        """Validate cryptocurrency quantity"""
        try:
            quantity = Decimal(str(quantity))
            if quantity <= 0:
                raise ValidationError("Quantity must be greater than 0")
            return quantity
        except (ValueError, TypeError):
            raise ValidationError("Invalid quantity value")

    @staticmethod
    def validate_price(price):
        """Validate price value"""
        try:
            price = Decimal(str(price))
            if price < 0:
                raise ValidationError("Price cannot be negative")
            return price
        except (ValueError, TypeError):
            raise ValidationError("Invalid price value")

    @staticmethod
    def validate_portfolio_name(name):
        """Validate portfolio name"""
        if not isinstance(name, str):
            raise ValidationError("Portfolio name must be a string")
        name = name.strip()
        if not name or len(name) > 100:
            raise ValidationError("Portfolio name must be between 1 and 100 characters")
        return name
