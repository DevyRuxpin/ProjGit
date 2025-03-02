import pytest
from app.services.crypto_api import CryptoAPI
from unittest.mock import patch

def test_get_price(app):
    with patch('requests.get') as mock_get:
        mock_get.return_value.json.return_value = {
            'bitcoin': {
                'usd': 50000.0,
                'usd_24h_change': 2.5
            }
        }
        
        crypto_api = CryptoAPI()
        result = crypto_api.get_price('bitcoin')
        
        assert 'bitcoin' in result
        assert result['bitcoin']['usd'] == 50000.0

def test_get_historical_data(app):
    with patch('requests.get') as mock_get:
        mock_data = {
            'prices': [[1631232000000, 46000.0], [1631318400000, 47000.0]],
            'market_caps': [[1631232000000, 870000000000], [1631318400000, 880000000000]],
            'total_volumes': [[1631232000000, 40000000000], [1631318400000, 41000000000]]
        }
        mock_get.return_value.json.return_value = mock_data
        
        crypto_api = CryptoAPI()
        result = crypto_api.get_historical_data('bitcoin', 2)
        
        assert 'prices' in result
        assert len(result['prices']) == 2
