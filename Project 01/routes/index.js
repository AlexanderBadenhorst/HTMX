const express = require('express');

const router = express.Router();

const books = [
  { id: 1, title: 'Science in the Soul', author: 'Richard Dawkins', ISBN: '978-0-593-07751-1' },
  { id: 2, title: "Leo's guide to Not Becoming A Statistic", author: 'Leo Prinsloo', ISBN: '978-1-920707-29-3' },
  { id: 3, title: 'The Elite', author: 'Barbara Cole', ISBN: '0-620-08517-7' },
  { id: 4, title: 'War and Peace', author: 'Leo Tolstoy', ISBN: '1-85326-062-2'  },
  { id: 5, title: 'A Feast For Crows', author: 'George R.R. Martin', ISBN: '978-0-00-744786-2'  },
  { id: 6, title: 'Recce', author: 'Koos Stadler', ISBN: '978-0-624-06944-7'  },
  { id: 7, title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche', ISBN: '978-0-141-39583-8'  },
  { id: 8, title: 'Dream Psychology', author: 'Sigmund Freud', ISBN: '978-1-099-63579-3'  },
  { id: 9, title: '12 Rules For Life', author: 'Jordan B. Peterson', ISBN: '978-0-141-98851-1' },
  { id: 10, title: 'Constitution Of The Republic Of South Africa, 1996', author: 'JUTA Law', ISBN: '978-1-48513-398-8' },
];

//router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get('/books', (req, res) => {
  console.log('books:', books);
  res.render('index', { action: '', books, book: {} });
});

// GET /books/new
router.get('/books/new', (req, res) => {
  if (req.headers['hx-request']) {
    res.render('form', { book: {} });
  } else {
    res.render('index', { action: 'new', books, book: {} });
  }
});


// GET /books/1/edit
router.get('/books/:id/edit', (req, res) => {
  const { id } = req.params;
  const book = books.find((c) => c.id === Number(id));

  if (req.headers['hx-request']) {
    res.render('form', { book });
  } else {
    res.render('index', { action: 'edit', books, book });
  }
});

// GET /books/:id
router.get('/books/:id(\\d+)', (req, res) => {
  const { id } = req.params;
  const book = books.find((c) => c.id === Number(id));

  if (book) {
    res.render('book', { book });
  } else {
    res.status(404).send('Book not found');
  }
});

// POST /books
router.post('/books', (req, res) => {
  console.log('New book added:', req.body);
  if (!req.body) {
    console.error('No request body found!');
    return res.status(400).send('Bad request');
  }
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    ISBN: req.body.ISBN,
  };

  books.push(newBook);

  if (req.headers['hx-request']) {
    res.render('sidebar', { books }, (err, sidebarHtml) => {
      const html = `
        <main id="content" hx-swap-oob="afterbegin">
          <p class="flash">Book was successfully added!</p>
        </main>
        ${sidebarHtml}
      `;
      res.send(html);
    });
  } else {
    res.render('index', { action: 'new', books, book: {} });
  }
});

// PUT /books/1
router.put('/update/:id', (req, res) => {
  const { id } = req.params;

  const newBook = {
    id: Number(id),
    title: req.body.title,
    author: req.body.author,
    ISBN: req.body.ISBN,
  };

  const index = books.findIndex((c) => c.id === Number(id));

  if (index !== -1) books[index] = newBook;

  if (req.headers['hx-request']) {
    res.render('sidebar', { books }, (err, sidebarHtml) => {
      res.render('book', { book: books[index] }, (err, bookHTML) => {
        const html = `
          ${sidebarHtml}
          <main id="content" hx-swap-oob="true">
            <p class="flash">Book was successfully updated!</p>
            ${bookHTML}
          </main>
        `;

        res.send(html);
      });
    });
  } else {
    res.redirect(`/books/${index + 1}`);
  }
});

// DELETE /books/1
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((c) => c.id === Number(id));

  if (index !== -1) books.splice(index, 1);
  if (req.headers['hx-request']) {
    res.render('sidebar', { books }, (err, sidebarHtml) => {
      const html = `
        <main id="content" hx-swap-oob="true">
          <p class="flash">Book was successfully deleted!</p>
        </main>
        ${sidebarHtml}
      `;
      res.send(html);
    });
  } else {
    res.redirect('/books');
  }
});

module.exports = router;