const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
require('dotenv').config();

chai.use(chaiHttp);

const host= `http://localhost:${process.env.PORT}`;


describe('GET', () => {
  it('should return all events for route "/api/getEvents" with no params', () => {
    return chai
      .request(host)
      .get('/api/getEvents')
      .then(res => {
          should.exist(res);
          expect(res.status).to.equal(200);
          res.body.should.be.a('object');
        })
        .catch(err => {throw err});
  });
});