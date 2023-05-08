import request from 'supertest';
import app from '../app';

describe('PingController', () => {
  describe('GET /ping', () => {
    it('should return pong', async () => {
      const response = await request(app).get('/ping');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'pong' });
    });
  });
});
