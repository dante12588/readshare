const router = require('express').Router();
const bookDB = require('../db/books');
//  ( router /book + -> )

//dodawanie książek
router.post('', (req, res) => {
    // bookDB.addBook('Atlas chmur', 'autor', 1233, 'jakis tam opis', 92);
    // bookDB.addBook('Cień wiatru', 'autor', 1233, 'jakis tam opis', 92);
    // bookDB.addBook('Miasto kości', 'autor', 1233, 'jakis tam opis', 92);
    // bookDB.addBook('Czerwień Rubinu', 'autor', 1233, 'jakis tam opis', 92);
    // bookDB.addBook('Gwiazd naszych wina', 'autor', 1233, 'jakis tam opis', 92);
    res.sendStatus(200);
})

//Wyświetlanie ksiażek danego użytkownika
router.post('/userid', (req, res) => {
    const userId = req.body.userId;
    console.log(`Pobieram książki użytkownika o id ${userId}`);
   bookDB.getBooksByUserId(92)
    .then(data => {
        res.json(data);
    }).catch(err => console.error(err));
})

//edycja ksiazek

//usuwanie ksiazek

module.exports = router;