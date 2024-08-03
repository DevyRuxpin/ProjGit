document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('report-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const incidentDate = document.getElementById('incident-date').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;

        // Validate form inputs
        if (!name || !email || !incidentDate || !location || !description) {
            alert('Please fill in all fields.');
            return;
        }

        // Create an incident report object
        const incidentReport = {
            name,
            email,
            incidentDate,
            location,
            description
        };

        // Log the incident report to the console (for now)
        console.log('Incident Report:', incidentReport);
    });

    // Add event listeners to navbar links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetPage = link.getAttribute('href');
            window.location.href = targetPage;
        });
    });
});