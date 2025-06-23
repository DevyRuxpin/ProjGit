const express = require('express');
const { calculateMean, calculateMedian, calculateMode } = require('./operations');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Helper function to validate and parse numbers
function parseNumbers(numsString) {
  if (!numsString) {
    throw new Error('nums are required.');
  }
  
  const numbers = numsString.split(',').map(num => {
    const parsed = parseFloat(num.trim());
    if (isNaN(parsed)) {
      throw new Error(`${num.trim()} is not a number.`);
    }
    return parsed;
  });
  
  return numbers;
}

// Mean route
app.get('/mean', (req, res) => {
  try {
    const numbers = parseNumbers(req.query.nums);
    const mean = calculateMean(numbers);
    
    res.json({
      operation: 'mean',
      value: mean
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Median route
app.get('/median', (req, res) => {
  try {
    const numbers = parseNumbers(req.query.nums);
    const median = calculateMedian(numbers);
    
    res.json({
      operation: 'median',
      value: median
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mode route
app.get('/mode', (req, res) => {
  try {
    const numbers = parseNumbers(req.query.nums);
    const mode = calculateMode(numbers);
    
    res.json({
      operation: 'mode',
      value: mode
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Root route for basic info
app.get('/', (req, res) => {
  res.json({
    message: 'Express Calculator API',
    endpoints: {
      mean: '/mean?nums=1,2,3,4,5',
      median: '/median?nums=1,2,3,4,5',
      mode: '/mode?nums=1,2,2,3,4'
    }
  });
});

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app; 