const router = require('express').Router();
const requireLogin = require('../middleware/requireLogin');
const userDb = require('../db/users');

router.get('/', (req, res) => {
    userDb.getUsers()
        .then(data => {
            res.render('home', {
                title: 'Strona główna',
                userName: req.session.userName,
                id: req.session.userId,
                users: data
            });
        })
        .catch(err => console.error(err));
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Logowanie'
    });
});

router.get('/books', requireLogin, (req, res) => {
    res.render('books', {
        title: 'Książki'
    });
});

router.get('/trade', requireLogin, (req, res) => {
    res.render('trade', {
        title: 'Wymiana'
    });
});

router.get('/allusers',(req, res) =>{
    userDb.getUsers()
        .then(data => {
            res.render('users', {
                title: 'Użytkownicy',
                users: data
            });
        })
        .catch(err => console.error(err));
});

module.exports = router;