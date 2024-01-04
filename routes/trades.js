const router = require('express').Router();
const tradeDB = require('../db/trade');
const booksDB = require('../db/books');

router.post('/', (req, res) => {

    //book1ID to książka użytkownika
    //book2ID to książka którą chcemy pożyczyć

    booksDB.getBookById(req.body.book2Id)
        .then((book) => {
            let data = JSON.parse(book);
            //(book1, book2, user1, user2)
            tradeDB.newTrade(req.body.book1Id, req.body.book2Id, req.session.userId, data.userid)
                .then(() => {
                    res.send('trade created');
                })
                .catch((err) => {
                    console.log(err);
                    res.send('error creating trade');
                });
        }).catch((err) => {
            console.log(err);
        });

});

router.put('/:id', (req, res) => {
    tradeDB.updateStatusTrade(req.params.id, req.body.status)
        .then(() => {
            tradeDB.getTradeById(req.params.id)
                .then((trade) => {
                   
                booksDB.changeAvailability(trade[0].book1_id, 'NA')
                    .then(()=>{console.log('book1 avalability NA')});

                booksDB.changeAvailability(trade[0].book2_id, 'NA')
                    .then(()=>{console.log('book2 avalability NA')});
                        
                });
        })
        .catch((err) => {
            console.log(err);
            res.send('error updating trade');
        });
});



module.exports = router;