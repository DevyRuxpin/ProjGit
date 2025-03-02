// Real-time chart updates
function updateChart(chartId, cryptocurrency) {
    fetch(`/chart/${cryptocurrency}/30`)
        .then(response => response.json())
        .then(data => {
            // Update chart with new data
            const chart = Chart.getChart(chartId);
            chart.data = transformChartData(data);
            chart.update();
        });
}

// Portfolio value updates
function updatePortfolioValue(portfolioId) {
    fetch(`/portfolio/${portfolioId}/value`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('portfolio-value').textContent = 
                `$${data.total_value.toFixed(2)}`;
        });
}

// Alert creation
document.getElementById('alert-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('/alerts/create', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Handle success
    });
});

// Initialize WebSocket connection for real-time updates
const ws = new WebSocket('wss://your-websocket-server');
ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    // Handle real-time updates
};
