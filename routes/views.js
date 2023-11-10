const router = require('express').Router();
const requireLogin = require('../middleware/requireLogin');

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

module.exports = router;