from flask import Blueprint, render_template
from flask_login import login_required, current_user
from app.models.analytics import SearchHistory, UserActivity
from app.services.analytics_service import AnalyticsService

bp = Blueprint('analytics', __name__)

@bp.route('/analytics')
@login_required
def index():
    search_history = SearchHistory.query.filter_by(user_id=current_user.id)\
        .order_by(SearchHistory.timestamp.desc()).limit(10).all()
    
    activities = UserActivity.query.filter_by(user_id=current_user.id)\
        .order_by(UserActivity.timestamp.desc()).limit(10).all()
    
    return render_template(
        'analytics/index.html',
        search_history=search_history,
        activities=activities
    )
