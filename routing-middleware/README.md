# Express Shopping List API

A simple JSON API application for managing a shopping list built with Express.js.

## Features

- **GET /items** - Get all shopping items
- **POST /items** - Add a new item to the shopping list
- **GET /items/:name** - Get a specific item by name
- **PATCH /items/:name** - Update an item's name and/or price
- **DELETE /items/:name** - Delete an item from the shopping list

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The server will run on port 3000 by default.

## API Endpoints

### GET /items
Returns all items in the shopping list.

**Response:**
```json
[
  {"name": "popsicle", "price": 1.45},
  {"name": "cheerios", "price": 3.40}
]
```

### POST /items
Adds a new item to the shopping list.

**Request Body:**
```json
{"name": "popsicle", "price": 1.45}
```

**Response:**
```json
{"added": {"name": "popsicle", "price": 1.45}}
```

### GET /items/:name
Returns a specific item by name.

**Response:**
```json
{"name": "popsicle", "price": 1.45}
```

### PATCH /items/:name
Updates an item's name and/or price.

**Request Body:**
```json
{"name": "new popsicle", "price": 2.45}
```

**Response:**
```json
{"updated": {"name": "new popsicle", "price": 2.45}}
```

### DELETE /items/:name
Deletes an item from the shopping list.

**Response:**
```json
{"message": "Deleted"}
```

## Testing

Run the test suite:
```bash
npm test
```

The tests cover all endpoints and include error cases.

## Project Structure

```
routing-middleware/
├── app.js              # Main Express application
├── server.js           # Server startup file
├── fakeDb.js           # Global items array storage
├── routes/
│   └── items.js        # Items routes using Express Router
├── routes/
│   └── items.test.js   # Comprehensive test suite
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Notes

- Items are stored in memory using a global array
- Data is cleared when the server restarts
- All routes use Express Router for better organization
- Comprehensive error handling for missing items and invalid requests 