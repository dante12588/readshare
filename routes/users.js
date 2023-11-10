const router = require('express').Router();
const userDb = require('../db/users');

// Logowanie użytkownika
router.post('/login', (req, res) => {
    const mail = req.body.mail;
    const passwd = req.body.passwd;
    console.log(mail, passwd);
    userDb.getUserByMail(mail)
        .then(data => {
            if (data.length === 0) {
                console.log('Nie znaleziono użytkownika o podanym adresie email');
                res.sendStatus(401);
            } else if (data[0].passwd !== passwd) {
                console.log('Niepoprawne hasło');
                console.log(data[0].passwd);
                res.sendStatus(401);
            } else {
                console.log('Poprawne dane logowania');
                res.redirect('/');
            }
        })
        .catch(err => console.error(err));
});
  
// Dodawanie nowego użytkownika
router.post('', (req, res) => {
// Kod do obsługi dodawania nowego użytkownika
    const mail = req.body.mail;
    const passwd = req.body.passwd;
    userDb.getUserByMail(mail)
        .then(data => {
            if (data.length > 0) {
                console.log('Użytkownik o podanym adresie email już istnieje');
                res.sendStatus(409);
            } else {
                userDb.addUser(mail, passwd);
                res.sendStatus(200);
            }
        })
        .catch(err => console.error(err));
});
  
// Edycja istniejącego użytkownika
router.put('/:id', (req, res) => {
    // Pobranie wartości id z adresu URL
    const id = req.params.id;
    // Kod do obsługi edycji istniejącego użytkownika
    userDb.editUser(id, 'mail', 'passEdit');
    res.sendStatus(200);
});
  
// Usuwanie istniejącego użytkownika
router.delete('/:id', (req, res) => {
// Kod do obsługi usuwania istniejącego użytkownika
});

module.exports = router;