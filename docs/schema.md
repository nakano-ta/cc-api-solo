# Schema Design

`pk` = Primary Key
`ref: >` = Many to one
`ref: <` = One to many
`ref: -` = One to one

## Book Table

```
Table Book {
  id int [pk]
  code char[3] [not null, unique]
  title varchar(200) [not null]
  author varchar(100)
  publisher varchar(30)
  price decimal
  publicationDate date
}
```

