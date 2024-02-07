const knex = require('../knex');

class Book {
  constructor(code, title, author, publisher, price, publicationDate) {
    this.code = code;
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.price = price;
    this.publicationDate = publicationDate;
  }
}

class BookRepository {
  static tableName = 'book';

  static getAll() {
    return knex(BookRepository.tableName).select();
  }

  static getByCode(code) {
    return knex(BookRepository.tableName).select().where({ code }).first();
  }

  static create(book) {
    const target = { ...book };
    delete target.id;

    // insertだとfirstが使えない
    return knex(BookRepository.tableName)
      .insert(target)
      .returning('*')
      .then((x) => x[0]);
  }

  static erase(code) {
    return knex(BookRepository.tableName).where({ code }).delete();
  }

  static update(book) {
    return knex(BookRepository.tableName)
      .where({ code: book.code })
      .update(book)
      .returning('*')
      .then((x) => x[0]);
  }
}

module.exports = {
  Book,
  BookRepository,
};
