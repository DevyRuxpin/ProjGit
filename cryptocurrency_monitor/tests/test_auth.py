import pytest
from app.models.user import User

def test_register(client):
    response = client.post('/register', data={
        'username': 'newuser',
        'email': 'new@example.com',
        'password': 'password123',
        'confirm_password': 'password123'
    })
    assert response.status_code == 302  # Redirect after successful registration
    assert User.query.filter_by(email='new@example.com').first() is not None

def test_login(client, test_user):
    response = client.post('/login', data={
        'email': 'test@example.com',
        'password': 'password123'
    })
    assert response.status_code == 302  # Redirect after successful login

def test_logout(client, test_user):
    # Login first
    client.post('/login', data={
        'email': 'test@example.com',
        'password': 'password123'
    })
    response = client.get('/logout')
    assert response.status_code == 302  # Redirect after logout
