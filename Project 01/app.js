const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

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

app.get('/', (req, res) => {
  res.send('Welcome to my book API!');
});

app.get('/books', (req, res) => {
  res.json(getBooks());
});

app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = getBookById(id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

app.post('/books', (req, res) => {
  const book = req.body;
  addBook(book);
  res.json(book);
});

app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = req.body;
  updateBook(id, book);
  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  deleteBook(id);
  res.json({ message: 'Book deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});