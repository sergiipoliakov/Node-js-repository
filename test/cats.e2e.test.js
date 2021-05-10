const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const { User, cats, newCat } = require('../model/__mocks__/data');

require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User.id }, JWT_SECRET_KEY);
User.token = token;

jest.mock('../model/cats.js');
jest.mock('../model/users.js');

describe('Testing the route api/cats', () => {
  let idNewCat = null;
  describe('should handle GET request', () => {
    test('should return 200 status for GET: /cats', async done => {
      const res = await request(app)
        .get('/api/cats')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.cats).toBeInstanceOf(Array);
      done();
    });
    test('should return 200 status for GET: /cats/:id', async done => {
      const cat = cats[0];
      const res = await request(app)
        .get(`/api/cats/${cat._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.cat._id).toBe(cat._id);
      done();
    });
    test('should return 404 status for GET: /cats/:id', async done => {
      const res = await request(app)
        .get(`/api/cats/5f837f855ba83a4f1829da5b`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
    test('should return 400 status for GET: /cats/:id', async done => {
      const res = await request(app)
        .get(`/api/cats/5f837f855ba83a4f1825b`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
  });

  describe('should handle POST request', () => {
    test('should return 201 status for POST: /cats', async done => {
      const res = await request(app)
        .post('/api/cats')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send(newCat);
      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      idNewCat = res.body.data.cat._id;
      done();
    });
    test('should return 400 status for POST: /cats wrong field', async done => {
      const res = await request(app)
        .post('/api/cats')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ ...newCat, test: 1 });
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
    test('should return 400 status for POST: /cats without field', async done => {
      const res = await request(app)
        .post('/api/cats')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ age: 1 });
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
  });

  describe('should handle PUT request', () => {
    test('should return 200 status for PUT: /cats/:id', async done => {
      const res = await request(app)
        .put(`/api/cats/${idNewCat}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ name: 'Barsik' });
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.cat.name).toBe('Barsik');
      done();
    });
    test('should return 400 status for PUT: /cats/:id wrong field', async done => {
      const res = await request(app)
        .put('/api/cats/1234')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ test: 1 });
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
    test('should return 404 status for PUT: /cats/:id ', async done => {
      const res = await request(app)
        .put('/api/cats/5f837f855ba83a4f1829da5b')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ age: 1 });
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
  });

  describe('should handle PATCH request', () => {
    test('should return 200 status for PATC: /cats/:id/vaccinated', async done => {
      const res = await request(app)
        .patch(`/api/cats/${idNewCat}/vaccinated`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ isVaccinated: true });
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.cat.isVaccinated).toBe(true);
      done();
    });
    test('should return 400 status for PUT: /cats/:id wrong field', async done => {
      const res = await request(app)
        .patch(`/api/cats/${idNewCat}/vaccinated`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ test: 1 });
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
    test('should return 404 status for PUT: /cats/:id ', async done => {
      const res = await request(app)
        .patch('/api/cats/5f837f855ba83a4f1829da5b/vaccinated')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ isVaccinated: true });
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
  });

  describe('should handle DELETE request', () => {
    const cat = cats[1];
    test('should return 200 status DELETE: /cats/:id', async done => {
      const res = await request(app)
        .delete(`/api/cats/${cat._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.cat).toStrictEqual(cat);
      done();
    });
    test('should return 400 status for DELETE: /cats/:id wrong field', async done => {
      const res = await request(app)
        .delete(`/api/cats/1234`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
    test('should return 404 status for DELETE: /cats/:id ', async done => {
      const res = await request(app)
        .delete('/api/cats/5f837f855ba83a4f1829da5b')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
  });
});
