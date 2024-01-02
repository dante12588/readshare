const db = require('./index');

let sql;

// add Rate
const addRate = (user_id, book_id, rate) => {
    return new Promise((resolve, reject) => {

        if (isNaN(rate)) {
            reject('Rate must be a number');
        }else if (rate < 0 || rate > 100) {
            reject('Rate must be between 1 and 5');
        }


        sql = `INSERT INTO ratings (user_id, book_id, rate) VALUES ('${user_id}', '${book_id}', '${rate}')`;
        db.query(sql, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};

const getBookWithRate = (book_id) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT books.idbooks, books.title, books.author, books.img, books.userid, AVG(ratings.rate) AS rate FROM books LEFT JOIN ratings ON books.idbooks = ratings.book_id WHERE books.idbooks = '${book_id}' GROUP BY books.idbooks`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            console.log(rows);
            resolve(rows);
        });
    });
};

const userRate = (user_id, book_id) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM ratings WHERE user_id = '${user_id}' AND book_id = '${book_id}'`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            console.log(rows);
            resolve(rows);
        });
    });
};

const updateRate = (user_id, book_id, rate) => {
    return new Promise((resolve, reject) => {
        sql = `UPDATE ratings SET rate = '${rate}' WHERE user_id = '${user_id}' AND book_id = '${book_id}'`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

const getBooksWithRate = () => {
    return new Promise((resolve, reject) => {
        sql = `SELECT books.idbooks, books.title, books.author, books.img, books.userid, AVG(ratings.rate) AS rate FROM books LEFT JOIN ratings ON books.idbooks = ratings.book_id GROUP BY books.idbooks`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

//get single book rate by book id

const getBookRate = (bookId) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT AVG(ratings.rate) AS rate FROM ratings WHERE book_id = '${bookId}'`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

module.exports = {
    addRate,
    getBookWithRate,
    getBooksWithRate,
    userRate,
    updateRate,
    getBookRate
};