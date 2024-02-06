const express = require('express');
const { Book, BookRepository } = require('./book/book.model');

const setupExpressServer = () => {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.get('/books', (req, res) => {
    BookRepository.getAll().then((x) => {
      res.status(200).json(x);
    });
  });

  app.post('/books', (req, res) => {
    const { code, title } = req.body;
    const book = new Book(null, code, title);

    BookRepository.create(book).then((x) => {
      res.status(201).json(x);
    });
  });

  app.delete('/books/:id', (req, res) => {
    const { id } = req.params;

    let target;
    const targetId = parseInt(id);
    BookRepository.getById(targetId).then((x) => {
      if (x == null) {
        res.sendStatus(404);
        return;
      }

      BookRepository.erase(id).then((x) => {
        res.sendStatus(204);
      });
    });
  });

  app.patch('/books/:id', (req, res) => {
    const { id } = req.params;
    let target;
    BookRepository.getById(id).then((x) => {
      target = x;

      if (target == null) {
        res.sendStatus(404);
        return;
      }

      req.body.id = id;
      for (const key in req.body) {
        if (target.hasOwnProperty(key)) {
          target[key] = req.body[key];
        }
      }

      BookRepository.update(target).then((x) => {
        res.status(200).json(x);
      });
    });
  });

  return app;
};

module.exports = { setupExpressServer };
