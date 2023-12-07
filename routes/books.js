const router = require('express').Router();
const bookDB = require('../db/books');
const multer = require('multer');
const { check, validationResult, body } = require('express-validator');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

//dodawanie książek
router.post('', upload.single('bookCover'), [
    check('title').isLength({ min: 1 }).withMessage('Tytuł jest wymagany'),
    check('author').isLength({ min: 1 }).withMessage('Autor jest wymagany'),
    check('year').isLength({ min: 1 }).withMessage('Rok jest wymagany'),
    check('description').isLength({ min: 1 }).withMessage('Opis jest wymagany'),
    check('bookCover').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Plik jest wymagany');
        }
        return true;
    })
],(req, res) => {
    const formData = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        bookDB.getBooksByUserIdLimit(req.session.userId, 7)
            .then(lastBooks => {
                res.render('addbook', {
                    title: 'Dodaj książkę',
                    userName: req.session.userName,
                    lastBooks: lastBooks,
                    errors: errors.array(),
                    formData: formData
                });
            });
        return;
    }
    if(req.session.userId){
        bookDB.addBook(req.body.title, req.body.author, req.body.year, req.body.description, req.session.userId, req.file.originalname);
        bookDB.getBooksByUserIdLimit(req.session.userId, 7)
            .then(lastBooks => {
                res.render('addbook', {
                    title: 'Dodaj książkę',
                    userName: req.session.userName,
                    message: 'Książka została dodana',
                    lastBooks: lastBooks,
                    errors: errors.array()
                });
            });
    }
    // res.sendStatus(200);
})

//Pobieranie najlepszych książek
router.get('/best', (req, res) => {
    bookDB.getBestBooks(2)
    .then(data => {
        res.json(data);
    }).catch(err => console.error(err));
});

router.get('/last', (req, res) => {
    bookDB.getLastBooks(2)
    .then(data => {
        res.json(data);
    }).catch(err => console.error(err));
});

//Wyświetlanie ksiażek danego użytkownika
router.post('/userid', (req, res) => {
    const userId = req.body.userId;
    console.log(`Pobieram książki użytkownika o id ${userId}`);
   bookDB.getBooksByUserId(92)
    .then(data => {
        res.json(data);
    }).catch(err => console.error(err));
})

//Pobieranie wszystkich książek
router.get('/all', (req, res) => {
    bookDB.getAllBooks()
    .then(data => {
        res.json(data);
    }).catch(err => console.error(err));
});

//Pobieranie książek danego użytkownika
router.get('/byid', (req, res) => {
    if(req.session.userId == undefined){
        console.log('Nie jesteś zalogowany dlatego nie można pobrać książek z bazy danych');
        res.json({ message: 'Nie jesteś zalogowany dlatego nie można pobrać książek z bazy danych' });
        return;
    }
    bookDB.getBooksByUserId(req.session.userId)
        .then(data => {
            res.json(data);
        }).catch(err => console.error(err));
});

//Pobieranie książek o podanym tytule lub autorze
router.post('/search', (req, res) => {
    const search = req.body.search;
    console.log(`Wyszukuje książki o frazie ${search}`);
    bookDB.getBooksByTitleOrAuthor(search)
    .then(data => {
        res.json(data);
    }).catch(err => console.error(err));
})

//pobieranie książki o danym adresie id

router.post('/id', (req, res) => {
    const id = req.body.id;
    console.log(`Pobieram książkę o id ${id}`);
    bookDB.getBookById(id)
    .then(data => {
        res.json(data);
    }).catch(err => console.error(err));
})

//edycja ksiazek
router.post('/edit/:id', upload.single('file'), (req, res) => {
    bookDB.editBook(req.params.id, req.body.title, req.body.author, req.body.year, req.body.description, req.file.originalname)
        .then( () => {
            res.json({ message: 'Książka została zaktualizowana' });
        }).catch(err => console.error(err));
});
//usuwanie ksiazek

module.exports = router;