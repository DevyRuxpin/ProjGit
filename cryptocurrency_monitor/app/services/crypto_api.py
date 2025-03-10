import requests
import logging
from ..utils.exceptions import APIConnectionError, RateLimitError

logger = logging.getLogger(__name__)

class CryptoAPI:
    def __init__(self):
        self.base_url = "https://api.coingecko.com/api/v3"
        self.session = requests.Session()

    def get_price(self, cryptocurrency_id):
        """Get current price for a cryptocurrency"""
        try:
            response = self.session.get(
                f"{self.base_url}/simple/price",
                params={
                    "ids": cryptocurrency_id,
                    "vs_currencies": "usd"
                }
            )
            
            if response.status_code == 429:
                logger.warning("Rate limit exceeded for CoinGecko API")
                raise RateLimitError("Rate limit exceeded")
            
            response.raise_for_status()
            return response.json()

        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching price for {cryptocurrency_id}: {str(e)}")
            raise APIConnectionError(f"Failed to fetch price data: {str(e)}")

    def get_historical_prices(self, cryptocurrency_id, days=30):
        """Get historical price data"""
        try:
            response = self.session.get(
                f"{self.base_url}/coins/{cryptocurrency_id}/market_chart",
                params={
                    "vs_currency": "usd",
                    "days": days
                }
            )
            
            if response.status_code == 429:
                logger.warning("Rate limit exceeded for CoinGecko API")
                raise RateLimitError("Rate limit exceeded")
            
            response.raise_for_status()
            return response.json()

        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching historical prices for {cryptocurrency_id}: {str(e)}")
            raise APIConnectionError(f"Failed to fetch historical data: {str(e)}")
