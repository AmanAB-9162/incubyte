const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/user');
const Sweet = require('../models/sweet');

let token;
let adminToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/sweet-shop-test');
  
  // Create regular user
  await request(app)
    .post('/api/auth/register')
    .send({ username: 'testuser', password: 'password123' });
  
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ username: 'testuser', password: 'password123' });
  
  token = loginRes.body.token;
  
  // Create admin user
  const admin = new User({
    username: 'admin',
    password: 'admin123',
    isAdmin: true
  });
  await admin.save();
  
  const adminLoginRes = await request(app)
    .post('/api/auth/login')
    .send({ username: 'admin', password: 'admin123' });
  
  adminToken = adminLoginRes.body.token;
});

afterAll(async () => {
  await User.deleteMany({});
  await Sweet.deleteMany({});
  await mongoose.connection.close();
});

describe('Sweets API', () => {
  beforeEach(async () => {
    await Sweet.deleteMany({});
  });

  describe('POST /api/sweets', () => {
    it('should add a new sweet', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 2.50,
          quantity: 100
        });
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('Chocolate Bar');
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .send({ name: 'Test', category: 'Test', price: 1, quantity: 10 });
      
      expect(res.status).toBe(401);
    });

    it('should validate required fields', async () => {
      const res = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Test' });
      
      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/sweets', () => {
    beforeEach(async () => {
      await Sweet.create([
        { name: 'Chocolate', category: 'Candy', price: 2, quantity: 50 },
        { name: 'Lollipop', category: 'Candy', price: 1, quantity: 100 }
      ]);
    });

    it('should get all sweets', async () => {
      const res = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /api/sweets/search', () => {
    beforeEach(async () => {
      await Sweet.create([
        { name: 'Milk Chocolate', category: 'Chocolate', price: 3, quantity: 50 },
        { name: 'Dark Chocolate', category: 'Chocolate', price: 4, quantity: 30 },
        { name: 'Gummy Bears', category: 'Gummy', price: 2, quantity: 100 }
      ]);
    });

    it('should search by name', async () => {
      const res = await request(app)
        .get('/api/sweets/search?name=Chocolate')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });

    it('should search by category', async () => {
      const res = await request(app)
        .get('/api/sweets/search?category=Gummy')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
    });

    it('should search by price range', async () => {
      const res = await request(app)
        .get('/api/sweets/search?minPrice=2&maxPrice=3')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('PUT /api/sweets/:id', () => {
    it('should update a sweet', async () => {
      const sweet = await Sweet.create({
        name: 'Test Sweet',
        category: 'Test',
        price: 1,
        quantity: 10
      });

      const res = await request(app)
        .put(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated Sweet', category: 'Updated', price: 2, quantity: 20 });
      
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Updated Sweet');
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    it('should allow admin to delete sweet', async () => {
      const sweet = await Sweet.create({
        name: 'Test Sweet',
        category: 'Test',
        price: 1,
        quantity: 10
      });

      const res = await request(app)
        .delete(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.status).toBe(200);
    });

    it('should not allow non-admin to delete', async () => {
      const sweet = await Sweet.create({
        name: 'Test Sweet',
        category: 'Test',
        price: 1,
        quantity: 10
      });

      const res = await request(app)
        .delete(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(403);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    it('should purchase sweet and decrease quantity', async () => {
      const sweet = await Sweet.create({
        name: 'Test Sweet',
        category: 'Test',
        price: 1,
        quantity: 10
      });

      const res = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(200);
      expect(res.body.quantity).toBe(9);
    });

    it('should not allow purchase when out of stock', async () => {
      const sweet = await Sweet.create({
        name: 'Test Sweet',
        category: 'Test',
        price: 1,
        quantity: 0
      });

      const res = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/sweets/:id/restock', () => {
    it('should allow admin to restock', async () => {
      const sweet = await Sweet.create({
        name: 'Test Sweet',
        category: 'Test',
        price: 1,
        quantity: 10
      });

      const res = await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ amount: 50 });
      
      expect(res.status).toBe(200);
      expect(res.body.quantity).toBe(60);
    });

    it('should not allow non-admin to restock', async () => {
      const sweet = await Sweet.create({
        name: 'Test Sweet',
        category: 'Test',
        price: 1,
        quantity: 10
      });

      const res = await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set('Authorization', `Bearer ${token}`)
        .send({ amount: 50 });
      
      expect(res.status).toBe(403);
    });
  });
});