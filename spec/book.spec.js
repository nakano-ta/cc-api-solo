const { setupExpressServer } = require('../src/server');
const { Book, BookRepository } = require('../src/book/book.model');
const config = require('../knexfile');
const knex = require('knex')(config);

const chai = require('chai');
const chaiHttp = require('chai-http');
const { as } = require('../src/knex');
const { json } = require('express');

chai.use(chaiHttp);
chai.should();

const app = setupExpressServer();

describe('The Express Server', () => {
  let request;

  describe('Book', () => {
    beforeEach(async () => {
      // 削除ありきで大丈夫か？
      await knex(BookRepository.tableName).delete();
      request = chai.request(app);
    });

    it('should get valid Book', async () => {
      const expected1 = await BookRepository.create(new Book('100', 'hoge'));
      const expected2 = await BookRepository.create(new Book('101', 'foo'));

      const res = await request.get('/books');
      res.should.be.json;
      res.should.have.status(200);
      res.body[0].should.deep.equal(expected1);
      res.body[1].should.deep.equal(expected2);
    });

    it('should post a new Book', async () => {
      const target = new Book('100', 'hoge');
      const res = await request.post('/books').send(target);
      res.should.be.json;
      res.should.have.status(201);
      res.body.id.should.not.equal(target.id);
      res.body.code.should.equal(target.code);
      res.body.title.should.equal(target.title);
    });

    it('should delete a Book', async () => {
      const target = await BookRepository.create(new Book('100', 'hoge'));
      const res = await request.delete(`/books/${target.id}`);
      res.should.have.status(204);
    });

    it('should delete no Book', async () => {
      const res = await request.delete('/books/100');
      res.should.have.status(404);
    });

    it('should patch a Book', async () => {
      const target = await BookRepository.create(new Book('100', 'hoge'));
      const res = await request
        .patch(`/books/${target.id}`)
        .send({ title: 'foo' });
      res.should.have.status(200);
      res.body.title.should.equal('foo');
    });

    it('should patch no Book', async () => {
      const res = await request.patch('/books/100').send({ title: 'foo' });
      res.should.have.status(404);
    });
  });
});
