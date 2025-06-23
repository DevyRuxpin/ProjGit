const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Import routes
const itemsRoutes = require('./routes/items');

// Use routes
app.use('/items', itemsRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app; 