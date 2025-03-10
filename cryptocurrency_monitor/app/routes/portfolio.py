from flask import Blueprint, render_template, jsonify, request, flash
from flask_login import login_required, current_user
from app.models.portfolio import Portfolio, Holding
from app.services.crypto_api import CryptoAPI
from app.services.analytics_service import AnalyticsService
from app import db

bp = Blueprint('portfolio', __name__)

@bp.route('/')
@bp.route('/index')
@login_required
def index():
    portfolios = Portfolio.query.filter_by(user_id=current_user.id).all()
    return render_template('portfolio/index.html', portfolios=portfolios)

@bp.route('/portfolio/create', methods=['POST'])
@login_required
def create_portfolio():
    data = request.json
    portfolio = Portfolio(
        name=data['name'],
        user_id=current_user.id
    )
    db.session.add(portfolio)
    db.session.commit()
    
    AnalyticsService.record_activity(
        current_user.id, 
        'portfolio_created', 
        {'portfolio_name': data['name']}
    )
    
    return jsonify({'message': 'Portfolio created successfully'})

@bp.route('/portfolio/<int:portfolio_id>')
@login_required
def view_portfolio(portfolio_id):
    portfolio = Portfolio.query.get_or_404(portfolio_id)
    if portfolio.user_id != current_user.id:
        flash('Access denied!', 'danger')
        return redirect(url_for('portfolio.index'))
    
    crypto_api = CryptoAPI()
    holdings_with_current_prices = []
    
    for holding in portfolio.holdings:
        current_price = crypto_api.get_price(holding.cryptocurrency)
        holdings_with_current_prices.append({
            'holding': holding,
            'current_price': current_price
        })
    
    return render_template(
        'portfolio/view.html',
        portfolio=portfolio,
        holdings=holdings_with_current_prices
    )

@bp.route('/portfolio/<int:portfolio_id>/add', methods=['POST'])
@login_required
def add_holding(portfolio_id):
    portfolio = Portfolio.query.get_or_404(portfolio_id)
    if portfolio.user_id != current_user.id:
        return jsonify({'error': 'Access denied'}), 403

    data = request.json
    holding = Holding(
        portfolio_id=portfolio_id,
        cryptocurrency=data['cryptocurrency'],
        quantity=data['quantity'],
        purchase_price=data['purchase_price']
    )
    
    db.session.add(holding)
    db.session.commit()
    
    AnalyticsService.record_activity(
        current_user.id,
        'holding_added',
        {
            'portfolio_id': portfolio_id,
            'cryptocurrency': data['cryptocurrency']
        }
    )
    
    return jsonify({'message': 'Holding added successfully'})

