from flask import Blueprint, render_template
from flask_login import login_required, current_user
from app.services.crypto_api import CryptoAPI
from app.services.analytics_service import AnalyticsService

bp = Blueprint('dashboard', __name__)

@bp.route('/')
@bp.route('/dashboard')
@login_required
def home():
    crypto_api = CryptoAPI()
    trending = crypto_api.get_trending_coins()
    analytics = AnalyticsService.get_user_analytics(current_user.id)
    
    return render_template('dashboard/home.html', 
                         trending=trending,
                         analytics=analytics)
