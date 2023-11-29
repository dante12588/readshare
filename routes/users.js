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
                req.session.userId = data[0].idusers;
                req.session.userName = data[0].mail;
                let returnTo = req.session.returnTo || '/';
                delete req.session.returnTo;
                res.redirect(returnTo);
            }
        })
        .catch(err => console.error(err));
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
  
// Dodawanie nowego użytkownika
router.post('', (req, res) => {
// Kod do obsługi dodawania nowego użytkownika
    console.log('Received POST request to add user');
    const mail = req.body.mail;
    const passwd = req.body.passwd;
    userDb.getUserByMail(mail)
        .then(data => {
            if (data.length > 0) {
                console.log('Użytkownik o podanym adresie email już istnieje');
                res.sendStatus(409);
            } else {
                userDb.addUser(mail, passwd)
                    .then(() => {
                        console.log('Dodano nowego użytkownika');
                        res.redirect('/');
                    })
                    .catch(err => console.error(err));
            }
        })
        .catch(err => console.error(err));
});
  
// Edycja istniejącego użytkownika
router.put('/edit', (req, res) => {
    const id = req.session.userId;
    userDb.editUser(id, req.body.mail, req.body.passwd)
        .then(() => {
            req.session.userName = req.body.mail;
            req.session.message = 'Zmieniono dane użytkownika';
            res.redirect('/profile');
        })
        .catch( () => {
            req.session.message = 'Nie udało się zmienić danych użytkownika';
            res.redirect('/profile');
        });
});
  
// Usuwanie istniejącego użytkownika
router.delete('/:id', (req, res) => {
// Kod do obsługi usuwania istniejącego użytkownika
    const id = req.params.id;
    userDb.deleteUser(id)
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error(err));
        req.session.destroy();
        res.redirect('/');
});

module.exports = router;