from app.models.portfolio import Portfolio, Holding
from app.services.crypto_api import CryptoAPI
from datetime import datetime, timedelta

class PortfolioService:
    def __init__(self):
        self.crypto_api = CryptoAPI()

    def calculate_portfolio_value(self, portfolio_id):
        """Calculate current portfolio value"""
        portfolio = Portfolio.query.get(portfolio_id)
        total_value = 0
        holdings_value = []

        for holding in portfolio.holdings:
            current_price_data = self.crypto_api.get_price(holding.cryptocurrency)
            if current_price_data and holding.cryptocurrency in current_price_data:
                current_price = current_price_data[holding.cryptocurrency]['usd']
                value = holding.quantity * current_price
                total_value += value
                holdings_value.append({
                    'cryptocurrency': holding.cryptocurrency,
                    'quantity': holding.quantity,
                    'current_price': current_price,
                    'value': value,
                    'profit_loss': value - (holding.quantity * holding.purchase_price)
                })

        return {
            'total_value': total_value,
            'holdings': holdings_value
        }

    def get_portfolio_performance(self, portfolio_id, days=30):
        """Calculate portfolio performance over time"""
        portfolio = Portfolio.query.get(portfolio_id)
        performance_data = []

        for holding in portfolio.holdings:
            historical_data = self.crypto_api.get_historical_data(
                holding.cryptocurrency, 
                days
            )
            if historical_data and 'prices' in historical_data:
                for timestamp, price in historical_data['prices']:
                    value = holding.quantity * price
                    performance_data.append({
                        'timestamp': timestamp,
                        'value': value,
                        'cryptocurrency': holding.cryptocurrency
                    })

        return performance_data
