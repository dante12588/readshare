const router = require('express').Router();
const bookDB = require('../db/books');
//  ( router /book + -> )

//dodawanie książek
router.post('', (req, res) => {
    bookDB.addBook('tytul', 'autor', 1233, 'jakis tam opis', 92);
    res.sendStatus(200);
})

//Wyświetlanie ksiażek danego użytkownika
router.post('', (req, res) => {
    const userId = req.body.userId;
    console.log(`Pobieram książki użytkownika o id ${userId}`);
})

//edycja ksiazek

//usuwanie ksiazek

module.exports = router;