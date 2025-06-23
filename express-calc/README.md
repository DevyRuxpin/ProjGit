# Express Calculator

A Node.js/Express.js application that performs statistical operations (mean, median, mode) on a set of numbers via REST API endpoints.

## Features

- **Mean calculation** - Average of a set of numbers
- **Median calculation** - Middle value of a sorted set of numbers
- **Mode calculation** - Most frequently occurring number
- **Error handling** - Graceful handling of invalid inputs
- **Comprehensive testing** - Unit and integration tests

## Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Starting the Server

```bash
# Start in production mode
npm start

# Start in development mode (with auto-restart)
npm run dev
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

### API Endpoints

#### Base URL
- `GET /` - Returns API information and available endpoints

#### Statistical Operations

All endpoints accept a `nums` query parameter with comma-separated numbers.

**Mean (Average)**
```
GET /mean?nums=1,2,3,4,5
```

**Median (Middle Value)**
```
GET /median?nums=1,2,3,4,5
```

**Mode (Most Frequent)**
```
GET /mode?nums=1,2,2,3,4
```

### Response Format

Successful responses follow this format:
```json
{
  "operation": "mean",
  "value": 3
}
```

Error responses follow this format:
```json
{
  "error": "foo is not a number."
}
```

### Examples

#### Calculate Mean
```bash
curl "http://localhost:3000/mean?nums=1,2,3,4,5"
```
Response:
```json
{
  "operation": "mean",
  "value": 3
}
```

#### Calculate Median
```bash
curl "http://localhost:3000/median?nums=1,2,3,4,5"
```
Response:
```json
{
  "operation": "median",
  "value": 3
}
```

#### Calculate Mode
```bash
curl "http://localhost:3000/mode?nums=1,2,2,3,4"
```
Response:
```json
{
  "operation": "mode",
  "value": 2
}
```

### Error Handling

The API gracefully handles various error conditions:

#### Invalid Numbers
```bash
curl "http://localhost:3000/mean?nums=foo,2,3"
```
Response (400 Bad Request):
```json
{
  "error": "foo is not a number."
}
```

#### Missing Parameters
```bash
curl "http://localhost:3000/mean"
```
Response (400 Bad Request):
```json
{
  "error": "nums are required."
}
```

## Testing

Run the test suite:
```bash
npm test
```

This will run both unit tests for the statistical operations and integration tests for the API endpoints.

### Test Coverage

- **Unit Tests** (`operations.test.js`): Tests for `calculateMean`, `calculateMedian`, and `calculateMode` functions
- **Integration Tests** (`app.test.js`): Tests for Express routes and error handling

## Project Structure

```
express-calc/
├── app.js              # Main Express application
├── operations.js       # Statistical calculation functions
├── operations.test.js  # Unit tests for operations
├── app.test.js        # Integration tests for API
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## Dependencies

- **express**: Web framework for Node.js
- **jest**: Testing framework
- **supertest**: HTTP assertion library for testing
- **nodemon**: Development server with auto-restart

## License

MIT 