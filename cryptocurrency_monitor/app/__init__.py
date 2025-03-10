from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from .config import Config
from .utils.logger import setup_logger
from .utils.error_handler import handle_error, APIError

db = SQLAlchemy()
login_manager = LoginManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'

    # Set up logging
    setup_logger(app)

    # Register blueprints
    from .routes import auth, portfolio, alerts, analytics
    app.register_blueprint(auth.bp)
    app.register_blueprint(portfolio.bp)
    app.register_blueprint(alerts.bp)
    app.register_blueprint(analytics.bp)

    # Register error handlers
    app.register_error_handler(404, handle_error)
    app.register_error_handler(500, handle_error)
    app.register_error_handler(APIError, handle_error)

    @app.route('/health')
    def health_check():
        """Health check endpoint"""
        return {'status': 'healthy'}, 200

    return app

