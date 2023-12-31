const db = require('./index');

let sql;

const newMessage = (sender_id, receiver_id, message) => {
    return new Promise((resolve, reject) => {
        sql = `INSERT INTO messages (sender_id, receiver_id, message) VALUES ('${sender_id}', '${receiver_id}', '${message}')`;
        db.query(sql, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};

const getMessages = (user1, user2) => {
    return new Promise((resolve, reject) => {
        sql = `SELECT * FROM messages WHERE (sender_id = '${user1}' AND receiver_id = '${user2}') OR (sender_id = '${user2}' AND receiver_id = '${user1}')`;
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

module.exports = {
    newMessage,
    getMessages
};