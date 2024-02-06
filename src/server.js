const express = require('express');
const { Book, BookRepository } = require('./book/book.model');

const setupExpressServer = () => {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.get('/books', async (req, res) => {
    const result = await BookRepository.getAll();
    res.status(200).json(result);
  });

  app.post('/books', async (req, res) => {
    const { code, title } = req.body;
    const book = new Book(code, title);
    const result = await BookRepository.create(book);
    res.status(201).json(result);
  });

  app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;

    const targetId = parseInt(id);
    const getResult = await BookRepository.getById(targetId);
    if (getResult == null) {
      res.sendStatus(404);
      return;
    }

    const eraseResult = await BookRepository.erase(id);
    res.sendStatus(204);
  });

  app.patch('/books/:id', async (req, res) => {
    const { id } = req.params;
    const getResult = await BookRepository.getById(id);

    if (getResult == null) {
      res.sendStatus(404);
      return;
    }

    const target = getResult;
    req.body.id = id;
    for (const key in req.body) {
      if (target.hasOwnProperty(key)) {
        target[key] = req.body[key];
      }
    }

    const updateResult = await BookRepository.update(target);
    res.status(200).json(updateResult);
  });

  return app;
};

module.exports = { setupExpressServer };
