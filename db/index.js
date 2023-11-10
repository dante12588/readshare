const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwer789Qwer',
  database: 'bookshare'
});

db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Połączono z bazą danych MySQL...');
  });

module.exports = db;