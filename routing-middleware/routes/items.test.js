const request = require('supertest');
const app = require('../app');
const items = require('../fakeDb');

// Clear items before each test
beforeEach(() => {
  items.length = 0;
});

describe('GET /items', () => {
  test('should return empty array when no items exist', async () => {
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('should return all items', async () => {
    items.push({ name: 'popsicle', price: 1.45 });
    items.push({ name: 'cheerios', price: 3.40 });
    
    const response = await request(app).get('/items');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { name: 'popsicle', price: 1.45 },
      { name: 'cheerios', price: 3.40 }
    ]);
  });
});

describe('POST /items', () => {
  test('should add new item', async () => {
    const newItem = { name: 'popsicle', price: 1.45 };
    
    const response = await request(app)
      .post('/items')
      .send(newItem);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ added: newItem });
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual(newItem);
  });

  test('should return 400 if name is missing', async () => {
    const response = await request(app)
      .post('/items')
      .send({ price: 1.45 });
    
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Name and price are required' });
  });

  test('should return 400 if price is missing', async () => {
    const response = await request(app)
      .post('/items')
      .send({ name: 'popsicle' });
    
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Name and price are required' });
  });
});

describe('GET /items/:name', () => {
  test('should return single item by name', async () => {
    items.push({ name: 'popsicle', price: 1.45 });
    items.push({ name: 'cheerios', price: 3.40 });
    
    const response = await request(app).get('/items/popsicle');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ name: 'popsicle', price: 1.45 });
  });

  test('should return 404 if item not found', async () => {
    const response = await request(app).get('/items/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Item not found' });
  });
});

describe('PATCH /items/:name', () => {
  test('should update item name and price', async () => {
    items.push({ name: 'popsicle', price: 1.45 });
    
    const updateData = { name: 'new popsicle', price: 2.45 };
    const response = await request(app)
      .patch('/items/popsicle')
      .send(updateData);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ updated: updateData });
    expect(items[0]).toEqual(updateData);
  });

  test('should update only name', async () => {
    items.push({ name: 'popsicle', price: 1.45 });
    
    const response = await request(app)
      .patch('/items/popsicle')
      .send({ name: 'new popsicle' });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ updated: { name: 'new popsicle', price: 1.45 } });
    expect(items[0]).toEqual({ name: 'new popsicle', price: 1.45 });
  });

  test('should update only price', async () => {
    items.push({ name: 'popsicle', price: 1.45 });
    
    const response = await request(app)
      .patch('/items/popsicle')
      .send({ price: 2.45 });
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ updated: { name: 'popsicle', price: 2.45 } });
    expect(items[0]).toEqual({ name: 'popsicle', price: 2.45 });
  });

  test('should return 404 if item not found', async () => {
    const response = await request(app)
      .patch('/items/nonexistent')
      .send({ name: 'new name' });
    
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Item not found' });
  });
});

describe('DELETE /items/:name', () => {
  test('should delete item by name', async () => {
    items.push({ name: 'popsicle', price: 1.45 });
    items.push({ name: 'cheerios', price: 3.40 });
    
    const response = await request(app).delete('/items/popsicle');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Deleted' });
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual({ name: 'cheerios', price: 3.40 });
  });

  test('should return 404 if item not found', async () => {
    const response = await request(app).delete('/items/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Item not found' });
  });
}); 