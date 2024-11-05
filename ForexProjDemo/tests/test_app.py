import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_index_page(client):
    response = client.get('/')
    assert response.status_code == 200
    # Print the response data for debugging
    print(response.data)
    # Check for some unique content in the rendered HTML
    assert b"USD" in response.data
    assert b"Kali Consulting LLC" in response.data  # Adjust this to match actual content