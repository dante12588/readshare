const router = require('express').Router();
const rateDb = require('../db/rate');

router.post('', (req, res) => {
    if(!req.session.userId){
        console.log('User not logged in');
        res.sendStatus(401);
        return;
    }
    rateDb.addRate(req.session.userId, req.body.bookId, req.body.rate)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});

router.get('/', (req, res) => {
    rateDb.getBooksWithRate()
        .then((rows) => {
            res.json(rows);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});

module.exports = router;