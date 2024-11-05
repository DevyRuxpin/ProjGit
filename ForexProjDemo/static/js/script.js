document.addEventListener('DOMContentLoaded', function() {
    const currencySymbols = {
        'USD': '$',
        'AUD': 'A$',
        'CAD': 'C$',
        'PLN': 'zł',
        'MXN': '$'
    };

    const fromCurrencyInput = document.getElementById('from_currency');
    const toCurrencyInput = document.getElementById('to_currency');
    const resultInput = document.getElementById('result');

    function updateCurrencySymbol(inputElement, symbolElementId) {
        const selectedCurrency = inputElement.value.toUpperCase();
        const symbol = currencySymbols[selectedCurrency] || '';
        document.getElementById(symbolElementId).textContent = `${selectedCurrency} ${symbol}`;
    }

    fromCurrencyInput.addEventListener('input', function() {
        updateCurrencySymbol(fromCurrencyInput, 'from_currency_symbol');
    });

    toCurrencyInput.addEventListener('input', function() {
        updateCurrencySymbol(toCurrencyInput, 'to_currency_symbol');
    });

    // Initialize symbols on page load
    updateCurrencySymbol(fromCurrencyInput, 'from_currency_symbol');
    updateCurrencySymbol(toCurrencyInput, 'to_currency_symbol');

    document.getElementById('forex-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const amount = document.getElementById('amount').value;
        const fromCurrency = document.getElementById('from_currency').value.toUpperCase();
        const toCurrency = document.getElementById('to_currency').value.toUpperCase();

        fetch('/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                amount: amount,
                from_currency: fromCurrency,
                to_currency: toCurrency
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultInput.value = data.error;
            } else {
                resultInput.value = data.result;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultInput.value = 'Error fetching conversion data';
        });
    });
});