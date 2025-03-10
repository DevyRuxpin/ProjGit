from app import db
from datetime import datetime

class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    cryptocurrency = db.Column(db.String(64), nullable=False)
    price_threshold = db.Column(db.Float, nullable=False)
    condition = db.Column(db.String(10), nullable=False)  # 'above' or 'below'
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
