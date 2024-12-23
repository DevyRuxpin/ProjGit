# Flask Blogly Application

This is a simple Flask application named **Flask Blogly** that demonstrates the use of Flask, SQLAlchemy, and Flask-DebugToolbar. The application allows for user management and is connected to a PostgreSQL database.

## Project Structure

```
flask-app
├── app.py                # Main entry point of the Flask application
├── config.py             # Configuration settings for the application
├── models.py             # SQLAlchemy models, including the User model
├── requirements.txt      # List of dependencies
├── static                # Static files (CSS, images, etc.)
│   └── style.css         # CSS styles for the application
├── templates             # HTML templates
│   └── base.html         # Base HTML template
├── .flaskenv             # Environment variables for Flask
├── .gitignore            # Files and directories to ignore by Git
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone flask-blogly/flask-app.git
   cd flask-app
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**
   ```
   pip install -r requirements.txt
   ```

4. **Set up the database:**
   Ensure you have PostgreSQL installed and create a database named `flask_blogly`. Update the database URI in `config.py` if necessary.

5. **Run the application:**
   ```
   flask run
   ```

6. **Access the application:**
   Open your web browser and go to `http://127.0.0.1:5000`.

## Features

- User management with the ability to create and manage users.
- Utilizes SQLAlchemy for database interactions.
- Integrated Flask-DebugToolbar for debugging during development.

## License

This project is licensed under the MIT License.
