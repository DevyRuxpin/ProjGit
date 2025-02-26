## Playlist-app

### Installation and Setup

Follow these steps to get the application running:

1. **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Create a virtual environment:**
    ```sh
    python3 -m venv venv
    ```

3. **Activate the virtual environment:**
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```
    - On Windows:
        ```sh
        venv\Scripts\activate
        ```

4. **Install the dependencies:**
    ```sh
    pip install -r requirements.txt
    ```

5. **Set up the database:**
    - Create the database:
        ```sh
        createdb playlist-app
        ```
    - Export the database URL environment variable:
        ```sh
        export DATABASE_URL=postgresql:///playlist-app
        ```

6. **Run database migrations:**
    ```sh
    flask db upgrade
    ```

7. **Start the Flask application:**
    ```sh
    flask run
    ```

### Using the Application

1. **Access the application:**
    Open your web browser and go to `http://127.0.0.1:5000/`.

2. **Homepage:**
    You will be redirected to the playlists page.

3. **Playlists:**
    - View all playlists: `http://127.0.0.1:5000/playlists`
    - Add a new playlist: `http://127.0.0.1:5000/playlists/add`
    - View a specific playlist: `http://127.0.0.1:5000/playlists/<playlist_id>`

4. **Songs:**
    - View all songs: `http://127.0.0.1:5000/songs`
    - Add a new song: `http://127.0.0.1:5000/songs/add`
    - View a specific song: `http://127.0.0.1:5000/songs/<song_id>`

5. **Add a song to a playlist:**
    - Go to the specific playlist page: `http://127.0.0.1:5000/playlists/<playlist_id>`
    - Click on "Add Song" and select a song to add to the playlist.

### Additional Information

- **Debugging:**
    - The application uses Flask-DebugToolbar for debugging. You can enable or disable it by modifying the `DEBUG_TB_INTERCEPT_REDIRECTS` configuration in `app.py`.

- **Database Configuration:**
    - The database URL is configured using the `DATABASE_URL` environment variable. Make sure to set it correctly before running the application.

- **Dependencies:**
    - All required dependencies are listed in the `requirements.txt` file. Make sure to install them using `pip install -r requirements.txt`.

- **Secret Key:**
    - The application uses a secret key for session management. It is set in `app.py` as `app.config['SECRET_KEY']`. You can change it to a more secure value if needed.
