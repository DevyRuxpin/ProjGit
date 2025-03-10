import pytest
from app.models.user import User

def test_register(client):
    """Test user registration"""
    response = client.post('/auth/register', json={
        'username': 'newuser',
        'email': 'newuser@example.com',
        'password': 'password123'
    })
    assert response.status_code == 201
    assert 'user' in response.json

def test_login(client, test_user):
    """Test user login"""
    response = client.post('/auth/login', json={
        'email': 'test@example.com',
        'password': 'password123'
    })
    assert response.status_code == 200
    assert 'token' in response.json

def test_invalid_login(client):
    """Test login with invalid credentials"""
    response = client.post('/auth/login', json={
        'email': 'wrong@example.com',
        'password': 'wrongpassword'
    })
    assert response.status_code == 401

def test_password_reset(client, test_user):
    """Test password reset functionality"""
    # Request password reset
    response = client.post('/auth/reset-password-request', json={
        'email': test_user.email
    })
    assert response.status_code == 200

def test_change_password(client, test_user, auth_headers):
    """Test password change"""
    response = client.post('/auth/change-password', 
        json={
            'old_password': 'password123',
            'new_password': 'newpassword123'
        },
        headers=auth_headers
    )
    assert response.status_code == 200
