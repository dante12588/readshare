const db = require('./index');

let sql;

const addBook = (title, author, year, description, userid) => {
    sql = `INSERT INTO books (title, author, year, description, userid) VALUES ('${title}', '${author}', '${year}', '${description}', '${userid}')`;
    db.query(sql, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) inserted`);
    });
};

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
    editBook
}