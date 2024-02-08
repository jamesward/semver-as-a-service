const app = require('./app');
const request = require('supertest');

describe('app', function() {
  this.timeout(60000);

  it('/validRange/1', function(done) {
    request(app)
      .get('/validRange/1')
      .expect(200)
      .expect(">=1.0.0 <2.0.0-0")
      .end(done);
  });
  it('/validRange/asdf', function(done) {
    request(app)
        .get('/validRange/asdf')
        .expect(400)
        .end(done);
  });
});
