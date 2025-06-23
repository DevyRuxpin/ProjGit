const express = require('express');
const router = express.Router();
const items = require('../fakeDb');

// GET /items - get all items
router.get('/', (req, res) => {
  res.json(items);
});

// POST /items - add new item
router.post('/', (req, res) => {
  const { name, price } = req.body;
  
  if (!name || price === undefined) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  
  const newItem = { name, price };
  items.push(newItem);
  
  res.json({ added: newItem });
});

// GET /items/:name - get single item by name
router.get('/:name', (req, res) => {
  const itemName = req.params.name;
  const item = items.find(item => item.name === itemName);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json(item);
});

// PATCH /items/:name - update item by name
router.patch('/:name', (req, res) => {
  const itemName = req.params.name;
  const { name, price } = req.body;
  
  const itemIndex = items.findIndex(item => item.name === itemName);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const updatedItem = { ...items[itemIndex] };
  
  if (name !== undefined) {
    updatedItem.name = name;
  }
  
  if (price !== undefined) {
    updatedItem.price = price;
  }
  
  items[itemIndex] = updatedItem;
  
  res.json({ updated: updatedItem });
});

// DELETE /items/:name - delete item by name
router.delete('/:name', (req, res) => {
  const itemName = req.params.name;
  const itemIndex = items.findIndex(item => item.name === itemName);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  items.splice(itemIndex, 1);
  
  res.json({ message: 'Deleted' });
});

module.exports = router; 