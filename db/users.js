const db = require('./index');

let sql = 'SELECT * FROM users';

const addUser = (mail, passwd) => {
    sql = `INSERT INTO users (mail, passwd) VALUES ('${mail}', '${passwd}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
};

const editUser = (id, mail, passwd) => {
    sql = `UPDATE users SET mail='${mail}', passwd='${passwd}' WHERE idusers=${id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
};

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM users WHERE idusers=${id}`;
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    });
}

const getUserByMail = (mail) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users WHERE mail='${mail}'`;
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = {
    addUser,
    editUser,
    getUserByMail,
    deleteUser
}