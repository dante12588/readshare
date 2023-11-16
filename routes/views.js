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

router.get('/addbook', (req, res) => {
    res.render('addbook', {
        title: 'Dodaj książkę',
        userName: req.session.userName,
    });
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