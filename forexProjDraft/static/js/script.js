document.getElementById('forex-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from_currency').value;
    const toCurrency = document.getElementById('to_currency').value;

    fetch('/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            'amount': amount,
            'from_currency': fromCurrency,
            'to_currency': toCurrency
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result) {
            document.getElementById('result').value = data.result;
        } else {
            alert('Conversion failed: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(error => console.error('Error:', error));
});