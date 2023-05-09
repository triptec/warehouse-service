import request from 'supertest';

import app from '../app';

describe('ProductController', () => {
  describe('GET /products', () => {
    it('should return all products', async () => {
      const response = await request(app).get('/products');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: 'f74fb16e-62b2-4af1-abed-1a0516200d1b',
          name: 'Dining Chair',
          price: '429.99 SEK',
          stock: 4,
        },
        {
          id: '014571de-30fc-4ae6-8d74-2f3641790e42',
          name: 'Dining Table',
          price: '5999.99 SEK',
          stock: 1,
        },
      ]);
    });
  });

  describe('GET /products/:id', () => {
    it('should return the product with the given ID', async () => {
      const response = await request(app).get(
        '/products/f74fb16e-62b2-4af1-abed-1a0516200d1b'
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 'f74fb16e-62b2-4af1-abed-1a0516200d1b',
        name: 'Dining Chair',
        price: '429.99 SEK',
        stock: 4,
      });
    });

    it('should return 404 if the product is not found', async () => {
      const response = await request(app).get('/products/non-existent-id');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ reason: 'Product not found' });
    });
  });

  describe('PATCH /products/:id', () => {
    it('should update the stock of the product with the given ID', async () => {
      const response = await request(app)
        .patch('/products/f74fb16e-62b2-4af1-abed-1a0516200d1b')
        .send({ stock: 10 });

      expect(response.status).toBe(204);
      const newResponse = await request(app).get(
        '/products/f74fb16e-62b2-4af1-abed-1a0516200d1b'
      );
      expect(newResponse.status).toBe(200);
      expect(newResponse.body).toEqual({
        id: 'f74fb16e-62b2-4af1-abed-1a0516200d1b',
        name: 'Dining Chair',
        price: '429.99 SEK',
        stock: 10,
      });
    });

    it('should return 404 if the product is not found', async () => {
      const response = await request(app)
        .patch('/products/non-existent-id')
        .send({ stock: 10 });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ reason: 'Product not found' });
    });

    it('should fail on invalid data', async () => {
      let response = await request(app)
        .patch('/products/f74fb16e-62b2-4af1-abed-1a0516200d1b')
        .send({ stock: -1 });

      expect(response.status).toBe(422);
      expect(response.body).toMatchObject({
        details: {
          'requestBody.stock': {
            message: 'Number must be greater than or equal to 0',
          },
        },
      });

      response = await request(app)
        .patch('/products/f74fb16e-62b2-4af1-abed-1a0516200d1b')
        .send({ stock: 'a' });

      expect(response.status).toBe(422);
      expect(response.body).toMatchObject({
        details: { 'requestBody.stock': { message: 'invalid float number' } },
      });
    });
  });

  describe('POST /products', () => {
    it('should create a new product', async () => {
      const newProduct = {
        name: 'New Product',
        price: {
          amount: 999.99,
          currency: 'SEK',
        },
        stock: 5,
      };

      const response = await request(app).post('/products').send(newProduct);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newProduct);
    });

    it('should fail on invalid data', async () => {
      const validProduct = {
        name: 'New Product',
        price: {
          amount: 999.99,
          currency: 'SEK',
        },
        stock: 5,
      };

      let response = await request(app).post('/products').send({ name: '' });
      expect(response.status).toBe(422);
      expect(response.body).toMatchObject({
        details: {
          'requestBody.price': {
            message: "'price' is required",
          },
        },
      });

      response = await request(app)
        .post('/products')
        .send({ ...validProduct, name: '' });
      expect(response.status).toBe(422);
      expect(response.body).toMatchObject({
        details: {
          'requestBody.name': {
            message: 'String must contain at least 1 character(s)',
          },
        },
      });

      response = await request(app)
        .post('/products')
        .send({ ...validProduct, name: 'a'.repeat(256) });
      expect(response.status).toBe(422);
      expect(response.body).toMatchObject({
        details: {
          'requestBody.name': {
            message: 'String must contain at most 255 character(s)',
          },
        },
      });

      response = await request(app)
        .post('/products')
        .send({
          ...validProduct,
          price: { ...validProduct.price, amount: 'a' },
        });
      expect(response.status).toBe(422);
      expect(response.body).toMatchObject({
        details: {
          'requestBody.price.amount': { message: 'invalid float number' },
        },
      });

      response = await request(app)
        .post('/products')
        .send({
          ...validProduct,
          price: { ...validProduct.price, amount: -1 },
        });
      expect(response.status).toBe(422);
      expect(response.body).toMatchObject({
        details: {
          'requestBody.price.amount': {
            message: 'Number must be greater than or equal to 0',
          },
        },
      });

      response = await request(app)
        .post('/products')
        .send({
          ...validProduct,
          price: { ...validProduct.price, currency: 'invalid-currency' },
        });
      expect(response.status).toBe(422);
      expect(response.body).toMatchObject({
        details: {
          'requestBody.price.currency': {
            message:
              "Invalid enum value. Expected 'SEK' | 'EUR' | 'USD', received 'invalid-currency'",
          },
        },
      });

      response = await request(app)
        .post('/products')
        .send({ ...validProduct, stock: 'a' });
      expect(response.status).toBe(422);
      expect(response.body).toMatchObject({
        details: { 'requestBody.stock': { message: 'invalid float number' } },
      });

      response = await request(app)
        .post('/products')
        .send({ ...validProduct, stock: -1 });
      expect(response.status).toBe(422);
      expect(response.body).toMatchObject({
        details: {
          'requestBody.stock': {
            message: 'Number must be greater than or equal to 0',
          },
        },
      });
    });
  });
});
