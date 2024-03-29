const { Book } = require('../../src/book/book.model');

exports.seed = async (knex) => {
  await knex('book').del();
  await knex('book').insert([
    new Book(
      '100',
      '独習JavaScript 新版',
      '外村 将大',
      '翔泳社',
      3278,
      '2021-11-15'
    ),
    new Book('101', '独習Java 新版', '外村 将大', '翔泳社', 3520, '2021-11-15'),
    new Book('102', '独習C# 新版', '外村 将大', '翔泳社', 3520, '2021-11-15'),
    new Book(
      '103',
      '独習Python 新版',
      '外村 将大',
      '翔泳社',
      3520,
      '2021-11-15'
    ),
    new Book('104', '独習C++ 新版', '外村 将大', '翔泳社', 3520, '2021-11-15'),
    new Book('105', '独習PHP 新版', '中山 清喬', '翔泳社', 3520, '2021-11-15'),
    new Book('106', '独習Ruby 新版', '中山 清喬', '翔泳社', 3520, '2021-11-15'),
    new Book('107', '独習Go 新版', '中山 清喬', '翔泳社', 3520, '2021-11-15'),
    new Book(
      '108',
      '独習Swift 新版',
      '中山 清喬',
      '翔泳社',
      3520,
      '2021-11-15'
    ),
    new Book(
      '109',
      '独習Kotlin 新版',
      '中山 清喬',
      '翔泳社',
      3520,
      '2021-11-15'
    ),
  ]);
};
