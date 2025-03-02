from flask import Blueprint, jsonify
from flask_login import login_required
from app.services.crypto_api import CryptoAPI

bp = Blueprint('charts', __name__)

@bp.route('/chart/<crypto_id>/<int:days>')
@login_required
def get_chart_data(crypto_id, days):
    crypto_api = CryptoAPI()
    data = crypto_api.get_historical_data(crypto_id, days)
    return jsonify(data)

@bp.route('/compare/<crypto_ids>')
@login_required
def compare_charts(crypto_ids):
    crypto_api = CryptoAPI()
    cryptos = crypto_ids.split(',')
    data = {}
    for crypto in cryptos:
        data[crypto] = crypto_api.get_historical_data(crypto, 30)
    return jsonify(data)
