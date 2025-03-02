from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models.alert import Alert
from app import db

bp = Blueprint('alerts', __name__)

@bp.route('/alerts/create', methods=['POST'])
@login_required
def create_alert():
    data = request.json
    alert = Alert(
        user_id=current_user.id,
        cryptocurrency=data['cryptocurrency'],
        price_threshold=data['price_threshold'],
        condition=data['condition']
    )
    db.session.add(alert)
    db.session.commit()
    return jsonify({'message': 'Alert created', 'id': alert.id})

@bp.route('/alerts/<int:alert_id>/toggle', methods=['POST'])
@login_required
def toggle_alert(alert_id):
    alert = Alert.query.get_or_404(alert_id)
    if alert.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    alert.is_active = not alert.is_active
    db.session.commit()
    return jsonify({'message': 'Alert updated', 'is_active': alert.is_active})
