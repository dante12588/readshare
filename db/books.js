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

module.exports = {
    addBook
}