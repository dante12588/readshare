const router = require('express').Router();
const tradeDB = require('../db/trade');

router.post('/', (req, res) => {
    tradeDB.newTrade(70,71,91,92)
    .then(() => {
        res.send('trade created');
    })
    .catch((err) => {
        console.log(err);
        res.send('error creating trade');
    });
});

router.post('/update', (req, res) => {
    tradeDB.updateStatusTrade(3, 'accepted')
    .then(() => {
        res.send('trade updated');
    })
    .catch((err) => {
        console.log(err);
        res.send('error updating trade');
    });
});



module.exports = router;