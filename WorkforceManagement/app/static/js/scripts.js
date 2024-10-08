document.addEventListener('DOMContentLoaded', function() {
    // Function to handle form submissions
    function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const action = form.getAttribute('action');
        const method = form.getAttribute('method');

        fetch(action, {
            method: method,
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.redirect_url;
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Attach form submit handlers
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    // Function to handle clock in
    function handleClockIn(event) {
        event.preventDefault();
        const button = event.target;
        const employeeId = button.getAttribute('data-employee-id');

        fetch(`/clock_in/${employeeId}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Clocked in successfully');
                window.location.reload();
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Function to handle clock out
    function handleClockOut(event) {
        event.preventDefault();
        const button = event.target;
        const employeeId = button.getAttribute('data-employee-id');

        fetch(`/clock_out/${employeeId}`, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Clocked out successfully');
                window.location.reload();
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Attach clock in/out handlers
    const clockInButtons = document.querySelectorAll('.clock-in-button');
    clockInButtons.forEach(button => {
        button.addEventListener('click', handleClockIn);
    });

    const clockOutButtons = document.querySelectorAll('.clock-out-button');
    clockOutButtons.forEach(button => {
        button.addEventListener('click', handleClockOut);
    });
});