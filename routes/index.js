const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const viewsRouter = require('./views');
const bookRouter = require('./books');
const tradesRouter = require('./trades');
const messagesRouter = require('./messages');

router.use('/', viewsRouter);
router.use('/users', usersRouter);
router.use('/books', bookRouter);
router.use('/trade', tradesRouter);
router.use('/messages', messagesRouter);

module.exports = router;