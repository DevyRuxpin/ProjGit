from flask import Flask, render_template, request, jsonify
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

API_BASE_URL = os.getenv('API_BASE_URL')
ACCESS_KEY = os.getenv('ACCESS_KEY')
CURRENCIES = os.getenv('CURRENCIES')
FORMAT = os.getenv('FORMAT')

@app.route('/')
def index():
    return render_template('forexConv.html')

@app.route('/convert', methods=['POST'])
def convert():
    amount = request.form.get('amount')
    from_currency = request.form.get('from_currency')
    to_currency = request.form.get('to_currency')
    
    # Log the received form data
    app.logger.debug(f'Received form data: amount={amount}, from_currency={from_currency}, to_currency={to_currency}')
    
    if not amount or not from_currency or not to_currency:
        return jsonify({'error': 'Missing required parameters'}), 400
    
    # Construct the API request URL
    url = f'{API_BASE_URL}?access_key={ACCESS_KEY}&currencies={CURRENCIES}&format={FORMAT}&from={from_currency}&to={to_currency}&amount={amount}'
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()
        
        # Log the API response
        app.logger.debug(f'API response: {data}')
        
        if 'result' in data:
            result = data['result']
            return jsonify({'result': result})
        else:
            return jsonify({'error': 'Conversion failed', 'details': data}), 400
    except requests.exceptions.RequestException as e:
        app.logger.error(f'API request failed: {e}')
        return jsonify({'error': 'API request failed', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)