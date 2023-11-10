const express = require('express');
const router = express.Router();

const usersRouter = require('./users');

router.use('/', usersRouter);


router.get('/', (req, res) => {
    res.render('home', {
        title: 'Strona główna'
    });
});

module.exports = router;