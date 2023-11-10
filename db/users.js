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

// const getUserByMail = (mail) => {
//     sql = `SELECT * FROM users WHERE mail='${mail}'`;
//     let data;
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         data = result;
//     });
//     return data;
    
// };

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
    getUserByMail
}