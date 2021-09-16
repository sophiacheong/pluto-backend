let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server/index');

const { expect } = chai;

chai.use(require('chai-sorted'));
chai.use(chaiHttp);

describe('API', () => {
  describe('GET /ping', () => {
    it('should return success', (done) => {
      chai.request(server)
        .get('/api/ping')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.success).to.equal(true);
          done()
        })
    })
  });

  describe('GET /post', () => {
    it('should return array of posts', (done) => {
      chai.request(server)
        .get('/api/post?tags=tech%2Chealth')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.post).to.be.a('array');
          expect(res.body.post).to.be.sortedBy('id');
          done();
        })
    });

    it('should return array of posts sorted by id', (done) => {
      chai.request(server)
        .get('/api/post?tags=tech%2Chealth')
        .query({ sortBy: 'id' })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.post).to.be.a('array');
          expect(res.body.post).to.be.sortedBy('id');
          done();
        })
    });

    it('should return array of posts sorted by likes', (done) => {
      chai.request(server)
        .get('/api/post?tags=tech%2Chealth')
        .query({ sortBy: 'likes' })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.post).to.be.a('array');
          expect(res.body.post).to.be.sortedBy('likes');
          done();
        })
    });

    it('should return array of posts sorted by popularity', (done) => {
      chai.request(server)
        .get('/api/post?tags=tech%2Chealth')
        .query({ sortBy: 'popularity' })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.post).to.be.a('array');
          expect(res.body.post).to.be.sortedBy('popularity');
          done();
        })
    });

    it('should return array of posts sorted by reads', (done) => {
      chai.request(server)
        .get('/api/post?tags=tech%2Chealth')
        .query({ sortBy: 'reads' })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.post).to.be.a('array');
          expect(res.body.post).to.be.sortedBy('reads');
          done();
        })
    });

    it('should return array of posts in ascending order by the sorts', (done) => {
      chai.request(server)
        .get('/api/post?tags=tech%2Chealth')
        .query({ sortBy: 'reads', direction: 'asc' })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.post).to.be.a('array');
          expect(res.body.post).to.be.sortedBy('reads', { ascending: true });
          done();
        })
    });

    it('should return array of posts in descending order by the sorts', (done) => {
      chai.request(server)
        .get('/api/post?tags=tech%2Chealth')
        .query({ sortBy: 'reads', direction: 'desc' })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.post).to.be.a('array');
          expect(res.body.post).to.be.sortedBy('reads', { descending: true });
          done();
        })
    });
  });
})