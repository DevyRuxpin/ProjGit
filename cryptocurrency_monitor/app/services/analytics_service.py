from app.models.analytics import SearchHistory, UserActivity
from app import db
from datetime import datetime
import json

class AnalyticsService:
    @staticmethod
    def record_search(user_id, search_term):
        """Record a user's search query"""
        search = SearchHistory(
            user_id=user_id,
            search_term=search_term
        )
        db.session.add(search)
        db.session.commit()

    @staticmethod
    def record_activity(user_id, activity_type, details):
        """Record user activity"""
        activity = UserActivity(
            user_id=user_id,
            activity_type=activity_type,
            details=details
        )
        db.session.add(activity)
        db.session.commit()

    @staticmethod
    def get_user_statistics(user_id):
        """Get user activity statistics"""
        search_count = SearchHistory.query.filter_by(user_id=user_id).count()
        activity_count = UserActivity.query.filter_by(user_id=user_id).count()
        
        recent_searches = SearchHistory.query\
            .filter_by(user_id=user_id)\
            .order_by(SearchHistory.timestamp.desc())\
            .limit(5)\
            .all()
            
        recent_activities = UserActivity.query\
            .filter_by(user_id=user_id)\
            .order_by(UserActivity.timestamp.desc())\
            .limit(5)\
            .all()

        return {
            'search_count': search_count,
            'activity_count': activity_count,
            'recent_searches': recent_searches,
            'recent_activities': recent_activities
        }

    @staticmethod
    def get_popular_searches():
        """Get most popular search terms"""
        return db.session.query(
            SearchHistory.search_term,
            db.func.count(SearchHistory.id).label('count')
        )\
        .group_by(SearchHistory.search_term)\
        .order_by(db.func.count(SearchHistory.id).desc())\
        .limit(10)\
        .all()
