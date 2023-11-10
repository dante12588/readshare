const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const viewsRouter = require('./views');

router.use('/', usersRouter);
router.use('/', viewsRouter);


router.get('/', (req, res) => {
    res.render('home', {
        title: 'Strona główna'
    });
});

module.exports = router;