const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const viewsRouter = require('./views');
const bookRouter = require('./books');

router.use('/', viewsRouter);
router.use('/users', usersRouter);
router.use('/books', bookRouter);



module.exports = router;