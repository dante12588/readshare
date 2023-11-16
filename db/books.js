const db = require('./index');

let sql;

//dodawanie książki do bazy
const addBook = (title, author, year, description, userid, img) => {
    sql = `INSERT INTO books (title, author, year, description, userid, img, date) VALUES ('${title}', '${author}', '${year}', '${description}', '${userid}', '${img}', NOW())`;
    db.query(sql, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) inserted`);
    });
};

//pobieranie najlepszych książek w ilości podanej w argumencie
const getBestBooks = (numbresBooks) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM books ORDER BY rate DESC LIMIT ${numbresBooks}`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

const getLastBooks = (numbresBooks) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM books ORDER BY date DESC LIMIT ${numbresBooks}`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

//pobieranie książek danego użytkownika

const getBooksByUserId = (userid) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM books WHERE userid=${userid}`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);    
        });
    });
}

const getBooksByTitleOrAuthor = (string) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM books WHERE title LIKE '%${string}%' or author LIKE '%${string}%'`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);    
        });
    });
};

const getAllBooks = () => {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM books`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);    
        });
    });
};

const editBook = (id, title, author, year, description) => {
    sql = `UPDATE books SET title='${title}', author='${author}', year='${year}', description='${description}' WHERE idbooks=${id}`;
    db.query(sql, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) updated`);
    });
};

module.exports = {
    addBook,
    getBooksByUserId,
    getBooksByTitleOrAuthor,
    getAllBooks,
    editBook,
    getBestBooks,
    getLastBooks
}