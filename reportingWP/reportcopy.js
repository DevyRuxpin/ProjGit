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

    // Form submission handling
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const incidentDate = document.getElementById('incident-date').value;
            const location = document.getElementById('location').value;
            const description = document.getElementById('description').value;

            // Create an incident report object
            const incidentReport = {
                name,
                email,
                incidentDate,
                location,
                description
            };

            // Store the incident report in localStorage
            localStorage.setItem('incidentReport', JSON.stringify(incidentReport));

            // Optionally, you can display a message to the user
            alert('Incident report submitted successfully!');
            
            // Clear the form
            form.reset();
        });
    }

    // Navigation handling
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default link behavior
            const targetPage = link.getAttribute('href');
            localStorage.setItem('lastVisitedPage', targetPage); // Store the target page in localStorage
            window.location.href = targetPage; // Navigate to the target page
        });
    });

    // Retrieve and display the last visited page
    const lastVisitedPage = localStorage.getItem('lastVisitedPage');
    if (lastVisitedPage) {
        console.log(`Last visited page: ${lastVisitedPage}`);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const articleContainer = document.getElementById('article1');
    const articleUrl = 'https://www.cnn.com/2024/08/06/politics/tim-walz-harris-vice-president';

    fetch(articleUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Create a temporary DOM element to parse the fetched HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // Extract the content you want to display
            const articleContent = doc.querySelector('article'); // Adjust the selector based on the actual structure of the page

            if (articleContent) {
                articleContainer.innerHTML = articleContent.innerHTML;
            } else {
                articleContainer.innerHTML = 'Article content could not be loaded.';
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            articleContainer.innerHTML = 'Failed to load article.';
        });
});