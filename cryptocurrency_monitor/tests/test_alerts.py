import pytest
from app.models.alert import Alert

def test_create_alert(client, test_user):
    client.post('/login', data={
        'email': 'test@example.com',
        'password': 'password123'
    })
    
    response = client.post('/alerts/create', json={
        'cryptocurrency': 'bitcoin',
        'price_threshold': 50000.0,
        'condition': 'above'
    })
    assert response.status_code == 200
    assert Alert.query.filter_by(cryptocurrency='bitcoin').first() is not None

def test_toggle_alert(client, test_user):
    # Create alert first
    alert = Alert(
        user_id=test_user.id,
        cryptocurrency='bitcoin',
        price_threshold=50000.0,
        condition='above'
    )
    db.session.add(alert)
    db.session.commit()

    response = client.post(f'/alerts/{alert.id}/toggle')
    assert response.status_code == 200
    assert not Alert.query.get(alert.id).is_active
