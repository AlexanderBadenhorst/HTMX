const express = require('express');
const router = express.Router();
const bookService = require('./bookService');

router.get('/', (req, res) => {
  bookService.getBooks((err, books) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching books' });
    } else {
      res.render('index', { title: 'Welcome to Book Library', books: books });
    }
  });
});

// Create a new book
router.get('/books/new', (req, res) => {
  res.render('new_book', { title: 'New Book' });
});

// Display all books
router.get('/books', (req, res) => {
  bookService.getBooks((err, books) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching books' });
    } else {
      res.render('books', { title: 'Book Library', books });
    }
  });
});

// Display a single book's details
router.get('/books/:id', (req, res) => {
  bookService.getBookById(req.params.id, (err, book) => {
    if (err || !book) {
      res.status(404).send({ message: 'Book not found' });
    } else {
      res.render('book', { title: 'Book Details', book });
    }
  });
});

// Update a book's details
router.get('/books/:id/edit', (req, res) => {
  bookService.getBookById(req.params.id, (err, book) => {
    if (err || !book) {
      res.status(404).send({ message: 'Book not found' });
    } else {
      res.render('edit_book', { title: 'Edit Book', book });
    }
  });
});

// Delete a book
router.post('/books/:id/delete', (req, res) => {
  bookService.deleteBook(req.params.id, (err) => {
    if (err) {
      res.status(500).send({ message: 'Error deleting book' });
    } else {
      res.redirect('/books');
    }
  });
});

// Search for a book
router.get('/books/search', (req, res) => {
  const query = req.query.q;
  if (!query) {
    res.status(400).send({ message: 'Query parameter is required' });
  } else {
    bookService.getBooks((err, books) => {
      if (err) {
        res.status(500).send({ message: 'Error fetching books' });
      } else {
        const filteredBooks = books.filter((book) => {
          return book.title.toLowerCase().includes(query.toLowerCase()) ||
                 book.author.toLowerCase().includes(query.toLowerCase());
        });
        res.render('books', { title: 'Search Results', books: filteredBooks });
      }
    });
  }
});

// Filter books by author
router.get('/books/author/:author', (req, res) => {
  const author = req.params.author;
  if (!author) {
    res.status(400).send({ message: 'Author parameter is required' });
  } else {
    bookService.getBooks((err, books) => {
      if (err) {
        res.status(500).send({ message: 'Error fetching books' });
      } else {
        const filteredBooks = books.filter((book) => {
          return book.author.toLowerCase().includes(author.toLowerCase());
        });
        res.render('books', { title: 'Books by Author', books: filteredBooks });
      }
    });
  }
});