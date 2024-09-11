// scripts.js
// script.js

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.add('hidden');
        } else {
            // Scrolling up
            header.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;
    });

    header.addEventListener('mouseenter', () => {
        header.classList.remove('hidden');
    });

    header.addEventListener('mouseleave', () => {
        if (window.pageYOffset > header.offsetHeight) {
            header.classList.add('hidden');
        }
    });
});

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

        // Clear the form
        form.reset();

        // Provide feedback to the user with a fade-out effect
        const feedbackMessage = document.createElement('div');
        feedbackMessage.textContent = 'Thank you for your report. We will review it shortly.';
        feedbackMessage.style.position = 'fixed';
        feedbackMessage.style.top = '20px';
        feedbackMessage.style.left = '50%';
        feedbackMessage.style.transform = 'translateX(-50%)';
        feedbackMessage.style.backgroundColor = '#007BFF';
        feedbackMessage.style.color = 'white';
        feedbackMessage.style.padding = '10px 20px';
        feedbackMessage.style.borderRadius = '4px';
        feedbackMessage.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        feedbackMessage.style.opacity = '1';
        feedbackMessage.style.transition = 'opacity 2s ease-in-out';

        document.body.appendChild(feedbackMessage);

        setTimeout(() => {
            feedbackMessage.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(feedbackMessage);
            }, 2000);
        }, 2000);
    });
});