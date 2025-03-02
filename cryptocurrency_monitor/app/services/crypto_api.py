import requests
from flask import current_app
import json

class CryptoAPI:
    def __init__(self):
        self.base_url = "https://api.coingecko.com/api/v3"
        self.api_key = current_app.config['COINGECKO_API_KEY']

    def get_price(self, crypto_id):
        endpoint = f"/simple/price"
        params = {
            'ids': crypto_id,
            'vs_currencies': 'usd',
            'include_24hr_change': 'true'
        }
        response = requests.get(f"{self.base_url}{endpoint}", params=params)
        return response.json()

    def get_historical_data(self, crypto_id, days):
        endpoint = f"/coins/{crypto_id}/market_chart"
        params = {
            'vs_currency': 'usd',
            'days': days,
            'interval': 'daily'
        }
        response = requests.get(f"{self.base_url}{endpoint}", params=params)
        return response.json()

    def get_trending_coins(self):
        endpoint = "/search/trending"
        response = requests.get(f"{self.base_url}{endpoint}")
        return response.json()
