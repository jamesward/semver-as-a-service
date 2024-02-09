const app = require('./app');
const request = require('supertest');

describe('app', function() {
  this.timeout(60000);

  it('/validRange/1', function(done) {
    request(app)
      .get('/validRange?range=1')
      .expect(200)
      .expect(">=1.0.0 <2.0.0-0")
      .end(done);
  });
  it('/validRange?range=asdf', function(done) {
    request(app)
        .get('/validRange?range=asdf')
        .expect(400)
        .end(done);
  });
  it('/maxSatisfying?v=1.0.1&v=1.0.2&range=>=1.0.0%20<2', function(done) {
    request(app)
        .get('/maxSatisfying?v=1.0.1&v=1.0.2&range=>=1.0.0 <2')
        .expect(200)
        .expect("1.0.2")
        .end(done);
  });
  it('/maxSatisfying?v=1.0.0&range=>=1.0.0 <2.0.0-0', function(done) {
    request(app)
        .get('/maxSatisfying?v=1.0.0&range=>=1.0.0 <2.0.0-0')
        .expect(200)
        .expect("1.0.0")
        .end(done);
  });
});
