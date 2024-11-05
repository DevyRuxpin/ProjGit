from flask import Flask, request, jsonify, render_template
import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

ACCESS_KEY = os.getenv('ACCESS_KEY')
CURRENCIES = os.getenv('CURRENCIES')
FORMAT = os.getenv('FORMAT')
API_BASE_URL = os.getenv('API_BASE_URL')

VALID_CURRENCIES = set(CURRENCIES.split(','))

@app.route('/')
def index():
    currencies = CURRENCIES.split(',')
    currency_symbols = {
        'USD': '$',
        'AUD': 'A$',
        'CAD': 'C$',
        'PLN': 'zł',
        'MXN': '$'
    }
    return render_template('forexConv.html', currencies=currencies, currency_symbols=currency_symbols)

@app.route('/convert', methods=['POST'])
def convert():
    try:
        amount = float(request.form.get('amount'))
        from_currency = request.form.get('from_currency').upper()
        to_currency = request.form.get('to_currency').upper()
        
        app.logger.debug(f'Received form data: amount={amount}, from_currency={from_currency}, to_currency={to_currency}')
        
        if not amount or not from_currency or not to_currency:
            return jsonify({'error': 'Missing required parameters'}), 400
        
        if from_currency not in VALID_CURRENCIES or to_currency not in VALID_CURRENCIES:
            return jsonify({'error': 'Invalid currency code'}), 400
        
        url = f'{API_BASE_URL}?access_key={ACCESS_KEY}&from={from_currency}&to={to_currency}&amount={amount}'
        
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        return jsonify(data)
    except ValueError:
        return jsonify({'error': 'Invalid amount format'}), 400
    except requests.exceptions.RequestException as e:
        app.logger.error(f'Error fetching conversion data: {e}')
        return jsonify({'error': 'Failed to fetch conversion data'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)