const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const viewsRouter = require('./views');

router.use('/', viewsRouter);
router.use('/users', usersRouter);



module.exports = router;