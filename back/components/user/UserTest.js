/* eslint-disable */
const { expect } = require('chai');
const axios = require('axios');
const base = 'http://localhost:8080/users';
let token;

describe('Init test', async function initTest() {
  await it('Get Users simple test', (done) => {
    axios.get(base)
      .then(({ data }) => {
        expect(data).to.be.an.instanceOf(Object);
        done();
      });
  });
  await it('Get Users search query error test', (done) => {
    axios.get(`${base}?search=56`)
      .catch(({ response }) => {
        expect(response.status).to.equal(400);
        done();
      })
  })
  await it('Get user id succesfuly test', (done) => {
    axios.get(`${base}/5bb22a6b97e896003f5e29d8`)
      .then(({data}) => {
        expect(data.user).to.be.an.instanceOf(Object);
        done();
      })
      .catch(({ response }) => {
        expect(response.status).to.equal(404);
        done();
      })
  })
  await it('Get user error id test', (done) => {
    axios.get(`${base}/asdasd`)
      .catch(({ response }) => {
        expect(response.status).to.equal(400);
        done();
      })
  })
  await it('Post create new user simple succesfuly test', (done) => {
    axios.post(`${base}`, { email: 'cdvillagomez27@gmail.com', password: '123123', confirmPassword: '123123', name: 'Carlos', lastName: 'Villagomez' })
      .then(({ data, status }) => {
        expect(status).to.equal(201);
        expect(data.user).to.be.an.instanceOf(Object);
        done();
      })
      .catch(({ response }) => {
        expect(response.status).to.equal(409)
        done();
      })
  })
  await it('Post create new user error test need more data', (done) => {
    axios.post(`${base}`, { email: 'cdvillagomez27@gmail.com', password: '123123', lastName: 'Villagomez' })
      .catch(({ response }) => {
        expect(response.status).to.equal(400);
        done();
      })
  })
  await it('Login user succesfuly', (done) => {
    axios.post(`${base}/login`, { email: 'cdvillagomez27@gmail.com', password: '123123' })
      .then(({ data, status }) => {
        expect(status).to.equal(200);
        expect(data.user).to.be.an.instanceOf(Object);
        expect(data).to.have.own.property('token');
        token = data.token;
        done();
      })
  })
  await it('Patch user succesfuly', (done) => {
    axios.patch(`${base}/5c04a0012510e90667db50ee`, { name: 'Carlos', lastName: 'Villagomez' }, { headers: { 'Authorization': 'Bearer ' + token } })
      .then(({ status }) => {
        expect(status).to.equal(204);
        done();
      })
  })
  await it('Patch user error need lastName', (done) => {
    axios.patch(`${base}/5c04a0012510e90667db50ee`, { name: 'Carlos' }, { headers: { 'Authorization': 'Bearer ' + token } })
      .catch(({ response }) => {
        expect(response.status).to.equal(400);
        done();
      })
  })
});