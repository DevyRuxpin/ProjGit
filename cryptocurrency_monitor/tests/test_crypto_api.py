import pytest
from unittest.mock import patch
from app.services.crypto_api import CryptoAPI
from app.utils.exceptions import APIConnectionError, RateLimitError

@pytest.fixture
def crypto_api():
    return CryptoAPI()

def test_get_price_success(crypto_api):
    """Test successful price fetch"""
    with patch('requests.Session.get') as mock_get:
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {
            'bitcoin': {'usd': 50000}
        }
        
        result = crypto_api.get_price('bitcoin')
        assert 'bitcoin' in result
        assert result['bitcoin']['usd'] == 50000

def test_get_price_rate_limit(crypto_api):
    """Test rate limit handling"""
    with patch('requests.Session.get') as mock_get:
        mock_get.return_value.status_code = 429
        
        with pytest.raises(RateLimitError):
            crypto_api.get_price('bitcoin')

def test_get_price_connection_error(crypto_api):
    """Test connection error handling"""
    with patch('requests.Session.get') as mock_get:
        mock_get.side_effect = ConnectionError()
        
        with pytest.raises(APIConnectionError):
            crypto_api.get_price('bitcoin')

def test_get_historical_prices(crypto_api):
    """Test historical price data fetch"""
    with patch('requests.Session.get') as mock_get:
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {
            'prices': [[1000000000, 50000]]
        }
        
        result = crypto_api.get_historical_prices('bitcoin')
        assert 'prices' in result
        assert len(result['prices']) > 0
