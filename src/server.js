const express = require('express');

class Book {
  static idCounter = 0;

  constructor(title) {
    this.id = Book.idCounter++;
    this.code = '100';
    this.title = title;
    this.author = '著者';
    this.publishedAt = new Date();
  }
}

let db = [new Book('Hoge'), new Book('Foo')];

const setupExpressServer = () => {
  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.get('/books', (req, res) => {
    res.json(db);
  });

  app.post('/books', (req, res) => {
    const { title } = req.body;
    const book = new Book(title);
    db.push(book);

    res.status(201).json(book);
  });

  app.delete('/books/:id', (req, res) => {
    const { id } = req.params;

    const book = db.find((x) => x.id === Number(id));
    if (book === null) {
      return res.sendStatus(404);
    }

    db = db.filter((x) => x.id !== Number(id));
    res.sendStatus(204);
  });

  app.patch('/books/:id', (req, res) => {
    const { id } = req.params;
    const book = db.find((x) => x.id === Number(id));

    if (book === null) {
      return res.sendStatus(404);
    }

    res.body.id = id;
    for (const key in req.body) {
      if (book.hasOwnProperty(key)) {
        book[key] = req.body[key];
      }
    }

    res.status(200).json(book);
  });

  return app;
};

module.exports = { setupExpressServer };
