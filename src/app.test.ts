import request from 'supertest';

import app from './app';

describe('app', () => {
  it('should return a 404 for an unknown route', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });

  it('should return a 500 for an unknown errors', async () => {
    const response = await request(app).get('/failure');
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'Internal Server Error',
      details: null,
    });
  });
});
