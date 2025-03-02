import pytest
from app.models.portfolio import Portfolio, Holding

def test_create_portfolio(client, test_user):
    client.post('/login', data={
        'email': 'test@example.com',
        'password': 'password123'
    })
    
    response = client.post('/portfolio/create', json={
        'name': 'Test Portfolio'
    })
    assert response.status_code == 200
    assert Portfolio.query.filter_by(name='Test Portfolio').first() is not None

def test_add_holding(client, test_user):
    # Create portfolio first
    portfolio = Portfolio(user_id=test_user.id, name='Test Portfolio')
    db.session.add(portfolio)
    db.session.commit()

    response = client.post(f'/portfolio/{portfolio.id}/add', json={
        'cryptocurrency': 'bitcoin',
        'quantity': 1.0,
        'purchase_price': 50000.0
    })
    assert response.status_code == 200
    assert Holding.query.filter_by(portfolio_id=portfolio.id).first() is not None
