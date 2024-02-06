const knex = require('../knex');

class Book {
  constructor(code, title) {
    this.code = code;
    this.title = title;

    // this.id = null;
    // this.author = null;
    // this.publisher = null;
    // this.price = null;
    // this.publicationDate = null;
  }
}

class BookRepository {
  static tableName = 'book';

  static getAll() {
    return knex(BookRepository.tableName).select();
  }

  static getById(id) {
    return knex(BookRepository.tableName).select().where({ id: id }).first();
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

  static erase(id) {
    return knex(BookRepository.tableName).where({ id }).delete();
  }

  static update(book) {
    return knex(BookRepository.tableName)
      .where({ id: book.id })
      .update(book)
      .returning('*')
      .then((x) => x[0]);
  }
}

module.exports = {
  Book,
  BookRepository,
};
