const model = require('./book.model');

class BookController {
  static async getAll(req, res) {
    const result = await model.BookRepository.getAll();
    res.status(200).json(result);
  }

  static async getByCode(req, res) {
    const { code } = req.params;
    const result = await model.BookRepository.getByCode(code);
    if (result == null) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(result);
  }

  static async create(req, res) {
    const { code, title } = req.body;
    const book = new model.Book(code, title);
    const result = await model.BookRepository.create(book);
    res.status(201).json(result);
  }

  static async erase(req, res) {
    const { code } = req.params;

    const targetCode = parseInt(code);
    const getResult = await model.BookRepository.getByCode(targetCode);
    if (getResult == null) {
      res.sendStatus(404);
      return;
    }

    await model.BookRepository.erase(code);
    res.sendStatus(204);
  }

  static async update(req, res) {
    const { code } = req.params;
    const getResult = await model.BookRepository.getByCode(code);

    if (getResult == null) {
      res.sendStatus(404);
      return;
    }

    const target = getResult;
    for (const key in req.body) {
      if (key === 'id') {
        continue;
      }

      if (target.hasOwnProperty(key)) {
        target[key] = req.body[key];
      }
    }

    const updateResult = await model.BookRepository.update(target);
    res.status(200).json(updateResult);
  }
}

module.exports = { BookController };
