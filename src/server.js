const express = require('express');
const path = require('path');
const { BookController } = require('./book/book.controller');
const { Validator } = require('./common/validator');

const setupExpressServer = () => {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, 'index.html'));
  });

  app.get('/books', BookController.getAll);
  app.get('/books/:code', Validator.validateCode, BookController.getByCode);
  app.post('/books', BookController.create);
  app.delete('/books/:code', Validator.validateCode, BookController.erase);
  app.patch('/books/:code', Validator.validateCode, BookController.update);

  return app;
};

module.exports = { setupExpressServer };
