const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Logowanie'
    });
});

module.exports = router;