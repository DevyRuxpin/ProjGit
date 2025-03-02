from app.models.analytics import SearchHistory, UserActivity
from app import db
from datetime import datetime, timedelta

class AnalyticsService:
    @staticmethod
    def record_search(user_id, search_term):
        search = SearchHistory(user_id=user_id, search_term=search_term)
        db.session.add(search)
        db.session.commit()

    @staticmethod
    def record_activity(user_id, activity_type, details):
        activity = UserActivity(
            user_id=user_id,
            activity_type=activity_type,
            details=details
        )
        db.session.add(activity)
        db.session.commit()

    @staticmethod
    def get_user_analytics(user_id):
        last_week = datetime.utcnow() - timedelta(days=7)
        searches = SearchHistory.query.filter(
            SearchHistory.user_id == user_id,
            SearchHistory.timestamp >= last_week
        ).all()
        
        activities = UserActivity.query.filter(
            UserActivity.user_id == user_id,
            UserActivity.timestamp >= last_week
        ).all()

        return {
            'searches': searches,
            'activities': activities
        }
