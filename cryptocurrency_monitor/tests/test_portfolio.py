import pytest
from app.models.portfolio import Portfolio

def test_create_portfolio(client, auth_headers):
    """Test portfolio creation"""
    response = client.post('/portfolio/create',
        json={'name': 'New Portfolio'},
        headers=auth_headers
    )
    assert response.status_code == 201
    assert 'id' in response.json

def test_add_holding(client, test_portfolio, auth_headers):
    """Test adding a holding to portfolio"""
    response = client.post(f'/portfolio/{test_portfolio.id}/add',
        json={
            'cryptocurrency': 'bitcoin',
            'quantity': 1.5,
            'purchase_price': 50000
        },
        headers=auth_headers
    )
    assert response.status_code == 200
    assert 'holding' in response.json

def test_get_portfolio(client, test_portfolio, auth_headers):
    """Test getting portfolio details"""
    response = client.get(f'/portfolio/{test_portfolio.id}',
        headers=auth_headers
    )
    assert response.status_code == 200
    assert response.json['name'] == 'Test Portfolio'

def test_update_portfolio(client, test_portfolio, auth_headers):
    """Test updating portfolio details"""
    response = client.put(f'/portfolio/{test_portfolio.id}',
        json={'name': 'Updated Portfolio'},
        headers=auth_headers
    )
    assert response.status_code == 200
    assert response.json['name'] == 'Updated Portfolio'

def test_delete_portfolio(client, test_portfolio, auth_headers):
    """Test portfolio deletion"""
    response = client.delete(f'/portfolio/{test_portfolio.id}',
        headers=auth_headers
    )
    assert response.status_code == 200
