import pytest
from app.models.alert import Alert

def test_create_alert(client, auth_headers):
    """Test alert creation"""
    response = client.post('/alerts/create',
        json={
            'cryptocurrency': 'bitcoin',
            'condition': 'above',
            'price_threshold': 50000
        },
        headers=auth_headers
    )
    assert response.status_code == 201
    assert 'id' in response.json

def test_get_alerts(client, auth_headers):
    """Test getting user alerts"""
    response = client.get('/alerts',
        headers=auth_headers
    )
    assert response.status_code == 200
    assert isinstance(response.json['alerts'], list)

def test_toggle_alert(client, auth_headers):
    """Test toggling alert status"""
    # First create an alert
    create_response = client.post('/alerts/create',
        json={
            'cryptocurrency': 'ethereum',
            'condition': 'below',
            'price_threshold': 3000
        },
        headers=auth_headers
    )
    alert_id = create_response.json['id']
    
    # Then toggle it
    response = client.post(f'/alerts/{alert_id}/toggle',
        headers=auth_headers
    )
    assert response.status_code == 200
    assert 'is_active' in response.json

def test_delete_alert(client, auth_headers):
    """Test alert deletion"""
    # First create an alert
    create_response = client.post('/alerts/create',
        json={
            'cryptocurrency': 'dogecoin',
            'condition': 'above',
            'price_threshold': 1
        },
        headers=auth_headers
    )
    alert_id = create_response.json['id']
    
    # Then delete it
    response = client.delete(f'/alerts/{alert_id}',
        headers=auth_headers
    )
    assert response.status_code == 200
