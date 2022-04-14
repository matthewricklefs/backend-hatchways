const expect = require('chai').expect;
const request = require('request');
const axios = require('axios');

describe('Hatchways Back End Assessment', () => {
  describe('Problem 1', () => {
    it('will return response body, 200 status for success', (done) => {
      request('http://localhost:3000/api/ping', (error, response, body) => {
        expect(body).to.equal('{"success":"true"}');
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('will return a 404 if the route is not hit successfully'),
      (done) => {
        request('http://localhost:3000/api/bing', (error, response, body) => {
          expect(response.statusCode).to.equal(404);
          done();
        });
      };
  });

  describe('Problem 2', () => {
    it('will return 200 status for successfully hitting endpoint', (done) => {
      request(
        'http://localhost:3000/api/posts/tech/id/asc',
        (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });

    it('will return 404 status if there is not a tag queried in the route', (done) => {
      request('http://localhost:3000/api/posts/', (error, response, body) => {
        expect(response.statusCode).to.equal(404);
        done();
      });
    });
  });
});
