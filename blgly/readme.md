
# Blogly

![Blogly Logo](https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png)

Blogly is a simple blogging platform built with Flask and SQLAlchemy. It allows users to create, edit, and delete posts, as well as tag them for better organization.

## Features

- User management: Create, edit, and delete users.
- Post management: Create, edit, and delete posts.
- Tag management: Create, edit, and delete tags.
- View recent posts on the homepage.
- View posts by user or tag.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/blogly.git
    cd blogly
    ```

2. Create a virtual environment and activate it:

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Upgrade `pip` and `setuptools` to the latest versions:

    ```bash
    pip install --upgrade pip setuptools
    ```

4. Install the dependencies without using any cached packages:

    ```bash
    pip install --no-cache-dir -r requirements.txt
    ```

5. Set up the database:

    - Initialize the database schema:

        ```bash
        python init_db.py
        ```

    - Run the migration commands:

        ```bash
        flask db init
        flask db migrate -m "Initial migration."
        flask db upgrade
        ```

6. Run the application:

    ```bash
    flask run
    ```

## Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory with the following content:

```properties
SQLALCHEMY_DATABASE_URI=postgresql://username@localhost:5001/database_name
SECRET_KEY=your_secret_key
FLASK_ENV=development
DEBUG=True
```

## Usage

- Navigate to `http://127.0.0.1:5000/` to view the homepage.
- Use the navigation bar to access users, posts, and tags.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
Kali Consulting LLC, RI, USA
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact [devyruxpin@gmail.com](mailto:devyruxpin.com).