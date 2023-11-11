const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const viewsRouter = require('./views');

router.use('/users', usersRouter);
router.use('/', viewsRouter);


router.get('/', (req, res) => {
    res.render('home', {
        title: 'Strona główna',
        userName: req.session.userName ? req.session.userName : 'nieznajomy',
        id: req.session.userId ? req.session.userId : null
    });
});

module.exports = router;