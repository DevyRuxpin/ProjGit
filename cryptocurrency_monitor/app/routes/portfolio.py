from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.services.portfolio_service import PortfolioService
from app.models.portfolio import Portfolio, Holding
from app import db

bp = Blueprint('portfolio', __name__)

@bp.route('/portfolio/create', methods=['POST'])
@login_required
def create_portfolio():
    data = request.json
    portfolio = Portfolio(
        user_id=current_user.id,
        name=data['name']
    )
    db.session.add(portfolio)
    db.session.commit()
    return jsonify({'message': 'Portfolio created', 'id': portfolio.id})

@bp.route('/portfolio/<int:portfolio_id>/add', methods=['POST'])
@login_required
def add_holding(portfolio_id):
    data = request.json
    holding = Holding(
        portfolio_id=portfolio_id,
        cryptocurrency=data['cryptocurrency'],
        quantity=data['quantity'],
        purchase_price=data['purchase_price']
    )
    db.session.add(holding)
    db.session.commit()
    return jsonify({'message': 'Holding added'})

@bp.route('/portfolio/<int:portfolio_id>/value')
@login_required
def get_value(portfolio_id):
    portfolio_service = PortfolioService()
    value = portfolio_service.get_portfolio_value(portfolio_id)
    return jsonify(value)
