const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const { set } = require('../app');
const { expectCt } = require('helmet');
const { deleteOne } = require('../model/schemas/user');

const { User, cats, newCat } = require('../model/_mocks_/data.js');
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User.id }, JWT_SECRET_KEY);
User.token = token;

jest.mock('../model/cats.js');
jest.mock('../model/users.js');

describe('Testing the route api/cats', () => {
  describe('should handle GET request', () => {
    test('should return 200 status for GET:/cats', async done => {
      const res = await request(app)
        .get('/api/cats')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.cats).toBeInstanceOf(Array);
    });
    test('should return 200 status for GET', async done => {
      const cat = cats[0];

      const res = await request(app)
        .get(`/api/cats/${cat._id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.cat._id).toBe(cat._id);
      done();
    });
    test('should return 200 status for GET', async done => {
      const res = await request(app)
        .get(`/api/cats/23423423423423423`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.cat._id).toBe(cat._id);
      done();
    });
  });

  describe('should handle POST request', () => {
    test('should return 201 status for POST:/cats', async done => {
      const res = await request(app)
        .get('/api/cats')
        .set('Authorization', `Bearer ${token}`)
        .set('Acces', `Aplication/json`)
        .send(newCat);

      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      idNewCat = res.body.data.cat.id;
      done();
    });
    test('should return 201 status for POST:/cats', async done => {
      const res = await request(app)
        .get('/api/cats')
        .set('Authorization', `Bearer ${token}`)
        .set('Acces', `Aplication/json`)
        .send(newCat);

      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      idNewCat = res.body.data.cat.id;
      done();
    });
    test('should return 201 status for POST:/cats', async done => {
      const res = await request(app)
        .get('/api/cats')
        .set('Authorization', `Bearer ${token}`)
        .set('Acces', `Aplication/json`)
        .send(newCat);

      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      idNewCat = res.body.data.cat.id;
      done();
    });
  });
});
