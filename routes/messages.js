const router = require('express').Router();
const messageDB = require('../db/messages');

//send message
router.post('', (req, res) => {
    const message = req.body.message;
    let sender = req.body.sender;
    let receiver = req.body.receiver;
    const tradeId = req.body.tradeId;

    if(req.session.userId != sender) {
        let pom = sender;
        sender = receiver;
        receiver = pom;
    }

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
    const receiver = req.query.receiver;
    const tradeId = req.query.tradeId;
    const userid2 = req.query.userId2;
    messageDB.getMessages(userid2, receiver, tradeId)
    .then(messages => {
        res.json(messages);
    })
    .catch(err => console.error(err));
});

module.exports = router;