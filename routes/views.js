const router = require('express').Router();
const requireLogin = require('../middleware/requireLogin');
const userDb = require('../db/users');
const bookDb = require('../db/books');
const tradeDb = require('../db/trade');

router.get('/', (req, res) => {
    bookDb.getBestBooks(5, req.session.userId)
        .then(bestBooks => {
            return bookDb.getLastBooks(2)
                .then(lastBooks => {
                    res.render('home', {
                        title: 'Strona główna',
                        userName: req.session.userName,
                        id: req.session.userId,
                        bestBooks: bestBooks,
                        lastBooks: lastBooks
                    });
                });
        })
        .catch(err => console.error(err));
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Logowanie',
        userName: req.session.userName,
    });
});

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Rejestracja',
        userName: req.session.userName,
    });
});



router.get('/addbook', requireLogin, (req, res) => {
    bookDb.getBooksByUserIdLimit(req.session.userId, 7)
        .then(lastBooks => {
            // console.log(lastBooks);
            res.render('addbook', {
                title: 'Dodaj książkę',
                userName: req.session.userName,
                lastBooks: lastBooks
            });
        });
});

router.get('/profile', requireLogin, (req, res) => {
    const userId = req.session.userId;
    userDb.getUserById(userId)
        .then(user => {
            bookDb.getBooksByUserId(userId)
                .then(books => {
                    res.render('user', {
                        title: 'Profil',
                        userName: req.session.userName,
                        books: books,
                        user: user,
                        error: req.session.error,
                        message: req.session.message
                    });
                });
        })
        .catch(err => console.error(err));
});

router.get('/books', (req, res) => {
    res.render('books', {
        title: 'Książki',
        userName: req.session.userName,
    });
});

router.get('/books/edit/:id', (req, res) => {
    const bookId = req.params.id;
    bookDb.getBookById(bookId)
        .then(book => {
            const data = JSON.parse(book);
            res.render('editbook', {
                title: 'Edycja książki',
                userName: req.session.userName,
                book: {
                    id: bookId,
                    title: data.title,
                    year: data.year,
                    description: data.description,
                    author: data.author,
                    img: data.img,
                }
            });
        })
        .catch(err => {
            console.error(err);
            res.redirect('/profile');
        });
    
});

router.get('/trade', requireLogin, (req, res) => {

    tradeDb.offeredTransactions(req.session.userId)
        .then(offeredTransactions => {
            tradeDb.receivedTransactions(req.session.userId)
                .then(receivedTransactions => {
                    res.render('trade', {
                        title: 'Wymiana',
                        userName: req.session.userName,
                        offeredTransactions: offeredTransactions,
                        receivedTransactions: receivedTransactions
                    });
                });
        })
        .catch(err => console.error(err));
});

router.get('/allusers',(req, res) =>{
    userDb.getUsers()
        .then(data => {
            res.render('users', {
                title: 'Użytkownicy',
                users: data,
                userName: req.session.userName,
            });
        })
        .catch(err => console.error(err));
});

router.get('/offerted', (req, res) => {
    tradeDb.getTradeByUserIdWithStatus(req.session.userId, 'pending')
        .then( pendingTrades => {
            tradeDb.getTradeByUserIdWithStatus(req.session.userId, 'accepted')
                .then(acceptedTrades => {
                    tradeDb.getTradeByUserIdWithStatus(req.session.userId, 'rejected')
                        .then(rejectedTrades => {
                            res.render('offerted', {
                                title: 'Wymiana',
                                userName: req.session.userName,
                                pendingTrades: pendingTrades,
                                acceptedTrades: acceptedTrades,
                                rejectedTrades: rejectedTrades
                            });
                        });
                });
        })
        .catch(err => console.error(err));
});

module.exports = router;