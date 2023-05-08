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
      expect(response.body).toEqual({ error: 'Product not found' });
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
      expect(response.body).toEqual({ error: 'Product not found' });
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
  });
});
