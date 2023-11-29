const router = require('express').Router();
const requireLogin = require('../middleware/requireLogin');
const userDb = require('../db/users');
const bookDb = require('../db/books');

router.get('/', (req, res) => {
    bookDb.getBestBooks(2)
        .then(bestBooks => {
            return bookDb.getLastBooks(2)
                .then(lastBooks => {
                    res.render('home', {
                        title: 'Strona główna',
                        userName: req.session.userName,
                        id: req.session.userId,
                        bestBooks: bestBooks,
                        lastBooks: lastBooks
                    });
                });
        })
        .catch(err => console.error(err));
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Logowanie',
        userName: req.session.userName,
    });
});

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Rejestracja',
        userName: req.session.userName,
    });
});



router.get('/addbook', requireLogin, (req, res) => {
    bookDb.getBooksByUserIdLimit(req.session.userId, 7)
        .then(lastBooks => {
            // console.log(lastBooks);
            res.render('addbook', {
                title: 'Dodaj książkę',
                userName: req.session.userName,
                lastBooks: lastBooks
            });
        });
});

router.get('/profile', requireLogin, (req, res) => {
    const userId = req.session.userId;
    userDb.getUserById(userId)
        .then(user => {
            bookDb.getBooksByUserId(userId)
                .then(books => {
                    res.render('user', {
                        title: 'Profil',
                        userName: req.session.userName,
                        books: books,
                        user: user,
                        error: req.session.error,
                        message: req.session.message
                    });
                });
        })
        .catch(err => console.error(err));
});

router.get('/books', (req, res) => {
    res.render('books', {
        title: 'Książki',
        userName: req.session.userName,
    });
});

router.get('/books/edit', (req, res) => {
    res.render('editbook', {
        title: 'Edycja książki',
        userName: req.session.userName,
    });
});

router.get('/trade', requireLogin, (req, res) => {
    res.render('trade', {
        title: 'Wymiana',
        userName: req.session.userName,
    });
});

router.get('/allusers',(req, res) =>{
    userDb.getUsers()
        .then(data => {
            res.render('users', {
                title: 'Użytkownicy',
                users: data,
                userName: req.session.userName,
            });
        })
        .catch(err => console.error(err));
});

module.exports = router;