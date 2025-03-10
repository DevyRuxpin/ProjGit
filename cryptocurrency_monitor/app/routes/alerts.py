from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from app.models.alert import Alert
from app.services.analytics_service import AnalyticsService
from app import db

bp = Blueprint('alerts', __name__)

@bp.route('/alerts')
@login_required
def index():
    alerts = Alert.query.filter_by(user_id=current_user.id).all()
    return render_template('alerts/index.html', alerts=alerts)

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
    
    AnalyticsService.record_activity(
        current_user.id,
        'alert_created',
        {
            'cryptocurrency': data['cryptocurrency'],
            'condition': data['condition']
        }
    )
    
    return jsonify({'message': 'Alert created successfully'})

@bp.route('/alerts/<int:alert_id>/toggle', methods=['POST'])
@login_required
def toggle_alert(alert_id):
    alert = Alert.query.get_or_404(alert_id)
    if alert.user_id != current_user.id:
        return jsonify({'error': 'Access denied'}), 403
    
    alert.is_active = not alert.is_active
    db.session.commit()
    
    return jsonify({'message': 'Alert toggled successfully'})

