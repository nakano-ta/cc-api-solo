# solo programming
solo programming の課題です。

## 目次
- [このリポジトリについて](#このリポジトリについて)
  - [APIの概要](#apiの概要)
- [構成](#構成)
  - ./
    - [index.js](#indexjs)
    - [server.js](#serverjs)
  - ./src/book
    - [Book クラス](#srcbookbook-クラス)
    - [BookController クラス](#srcbookbookcontroller-クラス)
  - ./src/common
    - [Validator クラス](#srccommonvalidator-クラス)
- [APIの種類](#apiの種類)
  - [GET /books](#get-books)
  - [GET /books/:code](#get-bookscode)
  - [POST /books](#post-books)
  - [DELETE /books/:code](#delete-bookscode)
  - [PATCH /books/:code](#patch-bookscode)

## このリポジトリについて
### APIの概要
このAPIでは書籍データを管理するCRUDを提供します。

## 構成
### ./index.js
node.jsのエントリーポイントとなるJSONファイルです。

### ./server.js
Expressの主要な設定やルーティングが定義されたJSONファイルです。

### ./src/book/Book クラス
このAPIで扱う書籍データに関するクラスです。
以下のような構成が想定されています。

### ./src/book/BookController クラス
DBとの直接的なやり取りが定義されたクラスです。

### ./src/common/Validator クラス
共通で使用されるValidateが定義されたクラスです。

## APIの種類
### GET /books
全ての書籍データを取得します。

### GET /books/:code
コードが合致する書籍データを取得します。

### POST /books
書籍データを作成します。

### DELETE /books/:code
コードが合致する書籍データを削除します。

### PATCH /books/:code
コードが合致する書籍データを更新します。
