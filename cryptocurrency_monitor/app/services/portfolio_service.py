from app.models.portfolio import Portfolio, Holding
from app.services.crypto_api import CryptoAPI

class PortfolioService:
    def __init__(self):
        self.crypto_api = CryptoAPI()

    def get_portfolio_value(self, portfolio_id):
        portfolio = Portfolio.query.get(portfolio_id)
        total_value = 0
        holdings_data = []

        for holding in portfolio.holdings:
            current_price = self.crypto_api.get_price(holding.cryptocurrency)
            value = current_price[holding.cryptocurrency]['usd'] * holding.quantity
            total_value += value
            
            holdings_data.append({
                'crypto': holding.cryptocurrency,
                'quantity': holding.quantity,
                'current_value': value,
                'purchase_value': holding.purchase_price * holding.quantity,
                'profit_loss': value - (holding.purchase_price * holding.quantity)
            })

        return {
            'total_value': total_value,
            'holdings': holdings_data
        }
