const db = require('./index');

let sql;

//dodawanie książki do bazy
const addBook = (title, author, year, description, userid, img) => {
    sql = `INSERT INTO books (title, author, year, description, userid, img, availability, date) VALUES ('${title}', '${author}', '${year}', '${description}', '${userid}', '${img}', 'A', NOW())`;
    db.query(sql, (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row(s) inserted`);
    });
};

//pobieranie najlepszych książek w ilości podanej w argumencie
const getBestBooks = (numbresBooks) => {
   sql = `SELECT books.idbooks, books.title, books.img, books.userid ,AVG(ratings.rate) as average_rating
            FROM books
            JOIN ratings ON books.idbooks = ratings.book_id
            GROUP BY books.idbooks, books.title
            ORDER BY average_rating DESC
            LIMIT ${numbresBooks};`
    return new Promise((resolve, reject) => {
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

//Pobierz ostatnie książki w ilości podanej w argumencie
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

//pobierz książki danego użytkownika w ilości podanej w argumencie
const getBooksByUserIdLimit = (userid, limit) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM books WHERE userid=${userid} ORDER BY date DESC LIMIT ${limit}`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);    
        });
    });
};
//pobieranie książek po tytule lub autorze

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

//pobieranie wszystkich książek
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

//edycja książki
const editBook = (id, title, author, year, description, img) => {
    return new Promise((resolve, reject) => {
        sql = `UPDATE books SET title='${title}', author='${author}', year='${year}', description='${description}', img='${img}' WHERE idbooks=${id}`;
        db.query(sql, (err) => {
            if (err) {
                reject(err);
            }
            console.log(`Row(s) updated`);
            resolve();
        });
    });
};

//pobieranie książki po id
const getBookById = (id) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM books WHERE idbooks=${id}`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(JSON.stringify(rows[0]));    
        });
    });
};

const changeAvailability = (id, availability) => {
    return new Promise((resolve, reject) => {
        sql = `UPDATE books SET availability='${availability}' WHERE idbooks=${id}`;
        db.query(sql, (err) => {
            if (err) {
                reject(err);
            }
            console.log(`Row(s) updated`);
            resolve();
        });
    });
};

module.exports = {
    addBook,
    getBooksByUserId,
    getBooksByTitleOrAuthor,
    getAllBooks,
    editBook,
    getBestBooks,
    getLastBooks,
    getBooksByUserIdLimit,
    getBookById,
    changeAvailability
}