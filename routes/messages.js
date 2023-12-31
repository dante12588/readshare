const router = require('express').Router();
const messageDB = require('../db/messages');

//send message
router.post('', (req, res) => {
    const message = req.body.message;
    const sender = req.session.userId;
    const receiver = req.body.receiver;
    const tradeId = req.body.tradeId;

    console.log(message, sender, receiver);

    messageDB.newMessage(sender, receiver, message, tradeId)
        .then(() => {
            console.log('Message sent');
            messageDB.getMessages(sender, receiver, tradeId)
                .then(messages => {
                    res.json(messages);
                });
        })
        .catch(err => console.error(err));

});

//get messages
router.get('/', (req, res) => {
    const sender = req.session.userId;
    const receiver = req.query.receiver;
    const tradeId = req.query.tradeId;
    console.log(sender, receiver);
    messageDB.getMessages(sender, receiver, tradeId)
    .then(messages => {
        res.json(messages);
    })
    .catch(err => console.error(err));
});

module.exports = router;