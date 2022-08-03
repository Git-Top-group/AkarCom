'use strict';
const { app } = require('../src/server'); 
const supertest = require('supertest');
const mockRequest = supertest(app);


const db  = require('../src/models/index.model.js');
describe('error-Handler', () => {


  it('Should respond with 404 status on an invalid route', async () => {
    const response = await mockRequest.get('/abc');
    expect(response.status).toBe(500);
  });
  it('Should respond with 404 status on an invalid method', async () => {
    const response = await mockRequest.delete('/food');
    expect(response.status).toBe(404);
  })
})
