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

module.exports = {
    addBook,
    getBooksByUserId
}