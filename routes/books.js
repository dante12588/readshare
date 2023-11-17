const router = require('express').Router();
const bookDB = require('../db/books');
const multer = require('multer');

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
router.post('', upload.single('bookCover'), (req, res) => {
    if(req.session.userId){
        bookDB.addBook(req.body.title, req.body.author, req.body.year, req.body.description, req.session.userId, req.file.originalname);
        bookDB.getBooksByUserIdLimit(req.session.userId, 7)
            .then(lastBooks => {
                res.render('addbook', {
                    title: 'Dodaj książkę',
                    userName: req.session.userName,
                    message: 'Książka została dodana',
                    lastBooks: lastBooks
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

//edycja ksiazek
router.put('/edit', (req, res) => {
    bookDB.editBook(req.body.id, req.body.title, req.body.author, req.body.year, req.body.description);
    res.sendStatus(200);
});
//usuwanie ksiazek

module.exports = router;