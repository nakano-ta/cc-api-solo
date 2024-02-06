const { setupExpressServer } = require('../src/server');
const { Book, BookRepository } = require('../src/book/book.model');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const app = setupExpressServer();

describe('The Express Server', () => {
  const hogeBook = new Book(300, '123', 'Hoge');

  let request;

  beforeEach(() => {
    request = chai.request(app);
  });

  describe('Book', () => {
    it('should return valid Book', () => {
      const res = request.get('/books');
      res.should.be.JSON;
      res.should.have.status(200);
      JSON.parse(res.text).should.deep.equal(hogeBook);
    });
  });
});
