const router = require('express').Router();
const rateDb = require('../db/rate');

router.post('', (req, res) => {
    if(!req.session.userId){
        console.log('User not logged in');
        res.sendStatus(401);
        return;
    }

    // Checking if the user has already rated this book
    rateDb.userRate(req.session.userId, req.body.bookId)
        .then((rows) => {
            if(rows.length > 0){
                // If the user has already rated this book, update the rate
                rateDb.updateRate(req.session.userId, req.body.bookId, req.body.rate)
                .then(() => {
                    res.sendStatus(200);
                })
                .catch(err => {
                    console.error(err);
                    res.sendStatus(500);
                });
            }else{
                // If the user has not rated this book, add the rate
                rateDb.addRate(req.session.userId, req.body.bookId, req.body.rate)
                .then(() => {
                    res.sendStatus(200);
                })
                .catch(err => {
                    console.error(err);
                    res.sendStatus(500);
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });

    // rateDb.addRate(req.session.userId, req.body.bookId, req.body.rate)
    // .then(() => {
    //     res.sendStatus(200);
    // })
    // .catch(err => {
    //     console.error(err);
    //     res.sendStatus(500);
    // });

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

router.get('/user', (req, res) => {
    if(!req.session.userId){
        console.log('User not logged in');
        res.sendStatus(401);
        return;
    }
    rateDb.userRate(req.session.userId, req.query.bookId)
        .then((rows) => {
            res.json(rows);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});

module.exports = router;