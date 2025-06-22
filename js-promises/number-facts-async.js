// Part 1: Number Facts using Async/Await

// Helper function to make API requests
async function makeRequest(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// 1. Get a fact about your favorite number
async function getSingleFact() {
    const container = document.getElementById('single-fact');
    container.innerHTML = '<div class="loading">Loading...</div>';
    
    try {
        const url = 'http://numbersapi.com/42?json';
        const data = await makeRequest(url);
        
        container.innerHTML = `
            <div class="fact">
                <strong>${data.number}:</strong> ${data.text}
            </div>
        `;
    } catch (error) {
        container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

// 2. Get facts about multiple numbers in a single request
async function getMultipleFacts() {
    const container = document.getElementById('multiple-facts');
    container.innerHTML = '<div class="loading">Loading...</div>';
    
    try {
        // Using the API to get facts about multiple numbers (1, 2, 3, 4, 5)
        const url = 'http://numbersapi.com/1,2,3,4,5?json';
        const data = await makeRequest(url);
        
        let html = '';
        for (let number in data) {
            html += `
                <div class="fact">
                    <strong>${number}:</strong> ${data[number]}
                </div>
            `;
        }
        container.innerHTML = html;
    } catch (error) {
        container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

// 3. Get 4 facts about your favorite number (making multiple requests)
async function getFourFacts() {
    const container = document.getElementById('four-facts');
    container.innerHTML = '<div class="loading">Loading...</div>';
    
    try {
        const favoriteNumber = 42;
        const promises = [];
        
        // Create 4 separate requests for the same number
        for (let i = 0; i < 4; i++) {
            const url = `http://numbersapi.com/${favoriteNumber}?json`;
            promises.push(makeRequest(url));
        }
        
        // Wait for all promises to resolve
        const results = await Promise.all(promises);
        
        let html = '';
        results.forEach((data, index) => {
            html += `
                <div class="fact">
                    <strong>Fact ${index + 1}:</strong> ${data.text}
                </div>
            `;
        });
        container.innerHTML = html;
    } catch (error) {
        container.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
} 