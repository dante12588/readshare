const db = require('./index');

let sql;

//create new trade

const newTrade = (book1, book2, user1, user2) => {
    return new Promise((resolve, reject) => {
        sql = `INSERT INTO trades (book1_id, book2_id, user1_id, user2_id) VALUES ('${book1}', '${book2}', '${user1}', '${user2}')`;
        db.query(sql, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};

const updateStatusTrade = (trade_id, status) => {
    return new Promise((resolve, reject) => {
        sql = `UPDATE trades SET status = '${status}' WHERE trade_id = '${trade_id}'`;
        db.query(sql, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};

module.exports = {
    newTrade,
    updateStatusTrade
};