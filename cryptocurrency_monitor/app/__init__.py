from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from .config import Config
from .utils.logger import setup_logger
from .utils.error_handler import handle_error, APIError

# Initialize extensions
db = SQLAlchemy()
login_manager = LoginManager()
migrate = Migrate()
limiter = Limiter(key_func=get_remote_address)

def create_app(config_class=Config):
    """Application factory function"""
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": app.config['ALLOWED_ORIGINS'],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization", "X-API-Key"]
        }
    })

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)
    limiter.init_app(app)
    
    # Configure login settings
    login_manager.login_view = 'auth.login'
    login_manager.login_message_category = 'info'

    # Set up logging
    setup_logger(app)

    # Register blueprints
    from .routes import auth, portfolio, alerts, analytics, docs
    app.register_blueprint(auth.bp, url_prefix='/api/v1/auth')
    app.register_blueprint(portfolio.bp, url_prefix='/api/v1/portfolio')
    app.register_blueprint(alerts.bp, url_prefix='/api/v1/alerts')
    app.register_blueprint(analytics.bp, url_prefix='/api/v1/analytics')
    app.register_blueprint(docs.bp, url_prefix='/docs')

    # Register error handlers
    app.register_error_handler(404, handle_error)
    app.register_error_handler(500, handle_error)
    app.register_error_handler(APIError, handle_error)

    # Register CLI commands
    from .cli import register_commands
    register_commands(app)

    @app.route('/health')
    def health_check():
        """Health check endpoint"""
        return {
            'status': 'healthy',
            'version': app.config['VERSION'],
            'environment': app.config['ENV']
        }, 200

    @app.before_request
    def before_request():
        """Actions to perform before each request"""
        pass

    @app.after_request
    def after_request(response):
        """Actions to perform after each request"""
        # Add security headers
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        return response

    return app

# Import models to ensure they are registered with SQLAlchemy
from .models import user, portfolio, alert, transaction

@login_manager.user_loader
def load_user(user_id):
    """Load user for Flask-Login"""
    return user.User.query.get(int(user_id))
