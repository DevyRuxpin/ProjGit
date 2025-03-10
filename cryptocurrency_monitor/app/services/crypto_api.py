import requests
from datetime import datetime, timedelta
import os
from flask import current_app
import logging

class CryptoAPI:
    def __init__(self):
        self.base_url = os.environ.get('COINGECKO_API_URL', 'https://api.coingecko.com/api/v3')
        self.session = requests.Session()

    def get_price(self, cryptocurrency):
        """Get current price for a cryptocurrency"""
        try:
            endpoint = f'/simple/price'
            params = {
                'ids': cryptocurrency,
                'vs_currencies': 'usd',
                'include_24hr_change': 'true'
            }
            response = self.session.get(f"{self.base_url}{endpoint}", params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logging.error(f"Error fetching price data: {str(e)}")
            return None

    def get_historical_data(self, cryptocurrency, days):
        """Get historical price data"""
        try:
            endpoint = f'/coins/{cryptocurrency}/market_chart'
            params = {
                'vs_currency': 'usd',
                'days': days,
                'interval': 'daily'
            }
            response = self.session.get(f"{self.base_url}{endpoint}", params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logging.error(f"Error fetching historical data: {str(e)}")
            return None

    def get_trending_coins(self):
        """Get trending cryptocurrencies"""
        try:
            endpoint = '/search/trending'
            response = self.session.get(f"{self.base_url}{endpoint}")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logging.error(f"Error fetching trending coins: {str(e)}")
            return None

    def get_market_data(self, cryptocurrency):
        """Get detailed market data for a cryptocurrency"""
        try:
            endpoint = f'/coins/{cryptocurrency}'
            params = {
                'localization': 'false',
                'tickers': 'false',
                'market_data': 'true',
                'community_data': 'false',
                'developer_data': 'false'
            }
            response = self.session.get(f"{self.base_url}{endpoint}", params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logging.error(f"Error fetching market data: {str(e)}")
            return None
