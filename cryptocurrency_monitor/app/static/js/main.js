// Utility functions
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`;
};

// WebSocket connection handler
class WebSocketHandler {
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.socket = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }

    connect() {
        this.socket = new WebSocket(this.endpoint);

        this.socket.onopen = () => {
            console.log('WebSocket connected');
            this.reconnectAttempts = 0;
        };

        this.socket.onclose = () => {
            console.log('WebSocket disconnected');
            this.reconnect();
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return this.socket;
    }

    reconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(() => {
                console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
                this.connect();
            }, 5000);
        }
    }
}

// Price updates handler
class PriceUpdatesHandler {
    constructor(tableId) {
        this.tableElement = document.getElementById(tableId);
    }

    updatePrice(cryptocurrency, newPrice) {
        const row = this.findRow(cryptocurrency);
        if (row) {
            const priceCell = row.querySelector('.price-cell');
            const oldPrice = parseFloat(priceCell.dataset.price);
            const priceChange = newPrice - oldPrice;

            priceCell.textContent = formatCurrency(newPrice);
            priceCell.dataset.price = newPrice;

            // Add visual indicator for price change
            priceCell.classList.remove('price-up', 'price-down');
            priceCell.classList.add(priceChange > 0 ? 'price-up' : 'price-down');
            
            // Trigger highlight animation
            row.classList.add('highlight-update');
            setTimeout(() => row.classList.remove('highlight-update'), 1000);
        }
    }

    findRow(cryptocurrency) {
        return this.tableElement.querySelector(`tr[data-crypto="${cryptocurrency}"]`);
    }
}

// Form validation
class FormValidator {
    static validateNumber(input) {
        return !isNaN(input) && parseFloat(input) > 0;
    }

    static validateCryptocurrency(input) {
        return input.trim().length > 0;
    }

    static showError(element, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        element.classList.add('is-invalid');
        element.parentNode.appendChild(errorDiv);
    }

    static clearErrors(form) {
        form.querySelectorAll('.is-invalid').forEach(element => {
            element.classList.remove('is-invalid');
        });
        form.querySelectorAll('.invalid-feedback').forEach(element => {
            element.remove();
        });
    }
}

// Chart updates
class ChartUpdater {
    constructor(chartId) {
        this.chart = Chart.getChart(chartId);
    }

    updateData(newData) {
        this.chart.data.datasets[0].data = newData;
        this.chart.update();
    }

    addDataPoint(label, value) {
        this.chart.data.labels.push(label);
        this.chart.data.datasets[0].data.push(value);
        
        // Remove oldest point if we have too many
        if (this.chart.data.labels.length > 30) {
            this.chart.data.labels.shift();
            this.chart.data.datasets[0].data.shift();
        }
        
        this.chart.update();
    }
}

// Initialize tooltips and popovers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

// Export modules
export {
    WebSocketHandler,
    PriceUpdatesHandler,
    FormValidator,
    ChartUpdater,
    formatCurrency,
    formatPercentage
};
