/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('book', (table) => {
    table.increments('id').primary();
    table.string('code', 3).notNullable().unique();
    table.string('title', 200).notNullable();
    table.string('author', 100);
    table.string('publisher', 100);
    table.decimal('price', 12, 0);
    table.date('publicationDate');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('book');
};
