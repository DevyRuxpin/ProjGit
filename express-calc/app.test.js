const request = require('supertest');
const app = require('./app');

describe('Express Calculator API', () => {
  describe('GET /mean', () => {
    test('should calculate mean of valid numbers', async () => {
      const response = await request(app)
        .get('/mean')
        .query({ nums: '1,2,3,4,5' });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        operation: 'mean',
        value: 3
      });
    });

    test('should handle decimal numbers', async () => {
      const response = await request(app)
        .get('/mean')
        .query({ nums: '1.5,2.5,3.5' });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        operation: 'mean',
        value: 2.5
      });
    });

    test('should handle negative numbers', async () => {
      const response = await request(app)
        .get('/mean')
        .query({ nums: '-1,-2,-3,-4,-5' });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        operation: 'mean',
        value: -3
      });
    });

    test('should return 400 for invalid number', async () => {
      const response = await request(app)
        .get('/mean')
        .query({ nums: 'foo,2,3' });
      
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'foo is not a number.'
      });
    });

    test('should return 400 for missing nums parameter', async () => {
      const response = await request(app).get('/mean');
      
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'nums are required.'
      });
    });

    test('should return 400 for empty nums parameter', async () => {
      const response = await request(app)
        .get('/mean')
        .query({ nums: '' });
      
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'nums are required.'
      });
    });
  });

  describe('GET /median', () => {
    test('should calculate median of odd number of elements', async () => {
      const response = await request(app)
        .get('/median')
        .query({ nums: '1,3,5,7,9' });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        operation: 'median',
        value: 5
      });
    });

    test('should calculate median of even number of elements', async () => {
      const response = await request(app)
        .get('/median')
        .query({ nums: '1,2,3,4' });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        operation: 'median',
        value: 2.5
      });
    });

    test('should handle unsorted numbers', async () => {
      const response = await request(app)
        .get('/median')
        .query({ nums: '5,2,8,1,9' });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        operation: 'median',
        value: 5
      });
    });

    test('should return 400 for invalid number', async () => {
      const response = await request(app)
        .get('/median')
        .query({ nums: '1,bar,3' });
      
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'bar is not a number.'
      });
    });

    test('should return 400 for missing nums parameter', async () => {
      const response = await request(app).get('/median');
      
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'nums are required.'
      });
    });
  });

  describe('GET /mode', () => {
    test('should find mode in array with single most frequent number', async () => {
      const response = await request(app)
        .get('/mode')
        .query({ nums: '1,2,2,3,4' });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        operation: 'mode',
        value: 2
      });
    });

    test('should find mode with multiple occurrences', async () => {
      const response = await request(app)
        .get('/mode')
        .query({ nums: '1,1,1,2,2,3' });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        operation: 'mode',
        value: 1
      });
    });

    test('should return first element when all numbers appear once', async () => {
      const response = await request(app)
        .get('/mode')
        .query({ nums: '1,2,3,4,5' });
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        operation: 'mode',
        value: 1
      });
    });

    test('should return 400 for invalid number', async () => {
      const response = await request(app)
        .get('/mode')
        .query({ nums: '1,baz,3' });
      
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'baz is not a number.'
      });
    });

    test('should return 400 for missing nums parameter', async () => {
      const response = await request(app).get('/mode');
      
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'nums are required.'
      });
    });
  });

  describe('GET /', () => {
    test('should return API information', async () => {
      const response = await request(app).get('/');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('endpoints');
      expect(response.body.endpoints).toHaveProperty('mean');
      expect(response.body.endpoints).toHaveProperty('median');
      expect(response.body.endpoints).toHaveProperty('mode');
    });
  });
}); 