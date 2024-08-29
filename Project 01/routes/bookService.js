const fs = require('fs');
const path = require('path');

const booksFile = path.join(__dirname, 'books.json');

const getBooks = () => {
  return JSON.parse(fs.readFileSync(booksFile, 'utf8'));
};

const getBookById = (id) => {
  const books = getBooks();
  return books.find((book) => book.id === id);
};

const addBook = (book) => {
  const books = getBooks();
  book.id = books.length + 1;
  books.push(book);
  fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
};

const updateBook = (id, book) => {
  const books = getBooks();
  const index = books.findIndex((b) => b.id === id);
  if (index !== -1) {
    books[index] = book;
    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
  }
};

const deleteBook = (id) => {
  const books = getBooks();
  const index = books.findIndex((b) => b.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    fs.writeFileSync(booksFile, JSON.stringify(books, null, 2));
  }
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};