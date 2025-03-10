from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from .config import Config

db = SQLAlchemy()
login_manager = LoginManager()
bcrypt = Bcrypt()
mail = Mail()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    login_manager.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)

    login_manager.login_view = 'auth.login'
    login_manager.login_message_category = 'info'

    from app.routes import auth, portfolio, alerts, analytics
    app.register_blueprint(auth.bp)
    app.register_blueprint(portfolio.bp)
    app.register_blueprint(alerts.bp)
    app.register_blueprint(analytics.bp)

    @app.before_first_request
    def create_tables():
        db.create_all()

    return app

