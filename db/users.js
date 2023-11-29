const db = require('./index');

let sql;

const addUser = (mail, passwd) => {
    return new Promise((resolve, reject) => {
        sql = `INSERT INTO users (mail, passwd) VALUES ('${mail}', '${passwd}')`;
        console.log(sql);
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log('Dodano nowego użytkownika do bazy danych');
                resolve(result);
            }
        });
    });
};

const getUsers = () => {
    return new Promise((resolve, reject) => {
        sql = 'SELECT * FROM users';
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    });
};

const editUser = (id, mail, passwd) => {
    return new Promise((resolve, reject) => {
        sql = `UPDATE users SET mail='${mail}', passwd='${passwd}' WHERE idusers=${id}`;
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
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

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users WHERE idusers=${id}`;
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

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
    deleteUser,
    getUsers,
    getUserById
}