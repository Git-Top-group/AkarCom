'use strict';
const { app } = require('../src/server'); 
const supertest = require('supertest');
const mockRequest = supertest(app);
let PORT=4000

// const { db } = require('../src/models/index.model');
const auth= require('../src/auth/middleware/basic');
const {sequelize}=require("../src/models/index.model");



beforeAll(async () => {
  sequelize.sync().then(() => {
        // start();
        // app.start(PORT);
    })
});



describe('Web server', () => {
    it('POST to /signup to create a new user', async () => {
        const response = await mockRequest.post('/signup').send({
            username: "ahmad",
            password: "abcd"
        });
        expect(response.status).toBe(201);
      });
      it('POST to /signin to login as a user (use basic auth)', async () => {
        const response = await mockRequest.post('/signin').auth('ahmad','abcd');
        expect(response.status).toBe(200);
    });
  
    });

    afterAll(async () => {
        sequelize.drop().then(() => {
              // start();
              // app.start(PORT);
          }).catch(console.error);
      });
      
    afterAll(async () => {
        await sequelize.drop();
      });