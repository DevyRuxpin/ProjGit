import pytest
from app.services.analytics_service import AnalyticsService
from app.models.analytics import SearchHistory, UserActivity

def test_record_search(app, test_user):
    AnalyticsService.record_search(test_user.id, 'bitcoin')
    search = SearchHistory.query.filter_by(user_id=test_user.id).first()
    assert search is not None
    assert search.search_term == 'bitcoin'

def test_record_activity(app, test_user):
    details = {'action': 'portfolio_created', 'portfolio_name': 'Test Portfolio'}
    AnalyticsService.record_activity(test_user.id, 'portfolio', details)
    
    activity = UserActivity.query.filter_by(user_id=test_user.id).first()
    assert activity is not None
    assert activity.activity_type == 'portfolio'
    assert activity.details == details
