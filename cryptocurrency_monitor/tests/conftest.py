import pytest
from app import create_app, db
from app.models.user import User
from app.models.portfolio import Portfolio
from app.models.alert import Alert
from app.config import TestConfig

@pytest.fixture
def app():
    """Create and configure a test application instance"""
    app = create_app(TestConfig)
    
    # Create test database and tables
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    """Create a test client"""
    return app.test_client()

@pytest.fixture
def runner(app):
    """Create a test CLI runner"""
    return app.test_cli_runner()

@pytest.fixture
def test_user(app):
    """Create a test user"""
    with app.app_context():
        user = User(
            username='testuser',
            email='test@example.com'
        )
        user.set_password('password123')
        db.session.add(user)
        db.session.commit()
        return user

@pytest.fixture
def test_portfolio(app, test_user):
    """Create a test portfolio"""
    with app.app_context():
        portfolio = Portfolio(
            name='Test Portfolio',
            user_id=test_user.id
        )
        db.session.add(portfolio)
        db.session.commit()
        return portfolio

@pytest.fixture
def auth_headers(test_user):
    """Create authentication headers"""
    return {'Authorization': f'Bearer {test_user.generate_auth_token()}'}
