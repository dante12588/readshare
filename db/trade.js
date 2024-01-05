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

// check if trade already exists
const checkExistingTrade = (book2, user1, user2) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM trades WHERE book2_id = '${book2}' AND user1_id = '${user1}' AND user2_id = '${user2}' AND status = 'pending'`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

// get all transactions where user is sender
const offeredTransactions = (user_id) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT trades.trade_id, trades.created_at, trades.updated_at,
        books1.idbooks AS book1_idbooks, books1.title AS book1_title, books1.author AS book1_author, /* i tak dalej dla każdej kolumny z books1 */
        books2.idbooks AS book2_idbooks, books2.title AS book2_title, books2.author AS book2_author /* i tak dalej dla każdej kolumny z books2 */
        FROM trades 
        INNER JOIN books AS books1 ON trades.book1_id = books1.idbooks 
        INNER JOIN books AS books2 ON trades.book2_id = books2.idbooks 
        WHERE trades.user1_id = '${user_id}' AND trades.status = "pending"`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            console.log(rows);
            resolve(rows);
        });
    });
};

// get all transactions where user is receiver
const receivedTransactions = (user_id) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT trades.trade_id, trades.created_at, trades.updated_at,
        books1.idbooks AS book1_idbooks, books1.title AS book1_title, books1.author AS book1_author, /* i tak dalej dla każdej kolumny z books1 */
        books2.idbooks AS book2_idbooks, books2.title AS book2_title, books2.author AS book2_author /* i tak dalej dla każdej kolumny z books2 */
        FROM trades 
        INNER JOIN books AS books1 ON trades.book1_id = books1.idbooks 
        INNER JOIN books AS books2 ON trades.book2_id = books2.idbooks 
        WHERE trades.user2_id = '${user_id}' AND trades.status = "pending"`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            console.log(rows);
            resolve(rows);
        });
    });
};

// change trade status to accepted or rejected
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

const getTradeByUserIdWithStatus = (user_id, status) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM trades WHERE (user1_id = '${user_id}' OR user2_id = '${user_id}') AND status = '${status}'`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

const getTradeById = (trade_id) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM trades WHERE trade_id = '${trade_id}'`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

module.exports = {
    newTrade,
    updateStatusTrade,
    offeredTransactions,
    receivedTransactions,
    getTradeByUserIdWithStatus,
    getTradeById,
    checkExistingTrade
};