# ForexProjDemo

ForexProjDemo is a web application that allows users to convert currencies on-demand. The application is built using Flask for the backend and vanilla JavaScript for the frontend.

## Features

- Convert between multiple currencies
- Real-time currency conversion using an external API
- User-friendly interface with dynamic currency symbol updates


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/ForexProjDemo.git
    cd ForexProjDemo
    ```

2. Create a virtual environment and activate it:
    ```sh
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

4. Create a [.env](http://_vscodecontentref_/9) file in the root directory and add your environment variables:
    ```
    ACCESS_KEY=your_access_key
    CURRENCIES=USD,AUD,CAD,PLN,MXN
    FORMAT=1
    API_BASE_URL=https://api.exchangeratesapi.io/latest
    ```

## Running the Application

1. Start the Flask application:
    ```sh
    python app.py
    ```

2. Open your web browser and navigate to `http://127.0.0.1:5000`.

## Running Tests

To run the tests, use the following command:

pytest


##Usage

Enter the currency code you want to convert from (e.g., USD).
Enter the currency code you want to convert to (e.g., EUR).
Enter the amount you want to convert.
Click the "Click to Convert" button to see the conversion result.

Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements
Flask
Requests
Exchange Rates API
