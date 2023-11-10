const router = require('express').Router();
const userDb = require('../db/users');

// Logowanie użytkownika
router.post('/users/login', (req, res) => {
// Kod do obsługi logowania użytkownika

});
  
// Dodawanie nowego użytkownika
router.post('/users', (req, res) => {
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
router.put('/users/:id', (req, res) => {
    // Pobranie wartości id z adresu URL
    const id = req.params.id;
    // Kod do obsługi edycji istniejącego użytkownika
    userDb.editUser(id, 'mail', 'passEdit');
    res.sendStatus(200);
});
  
// Usuwanie istniejącego użytkownika
router.delete('/users/:id', (req, res) => {
// Kod do obsługi usuwania istniejącego użytkownika
});

module.exports = router;