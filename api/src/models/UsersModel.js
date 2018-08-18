const db = require('../config/db');
const UserModel = () => {

    const findAll = (req, res) => {

        return new Promise((resolve, reject) => {
            db.query('select * from users', function (err, results) {
                if (err)
                    return reject(err);
                else {
                    return resolve(results);
                }
            });
        })
    };

    const findOne = (req, res) => {

        return new Promise((resolve, reject) => {
            db.query(`select * from users where id= ${parseInt(req.params.id)}`, function (err, results) {
                if (err)
                    return reject(err);
                else {
                    return resolve(results);
                }
            });
        });
    };

    const create = (req, res) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users (name) VALUES ('${req.body.name}');`, function (err, results) {
                if (err)
                    return reject(err);
                else {
                    return resolve(results);
                }
            });
        });
    };


    const update = (req, res) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET name='${req.body.name}' WHERE id=${parseInt(req.params.id)}`, function (err, results) {
                if (err)
                    return reject(err);
                else {
                    return resolve(results);
                }
            });
        });
    };

    const remove = (req, res) => {

        return new Promise((resolve, reject) => {
            db.query(`delete users where id= ${parseInt(req.params.id)}`, function (err, results) {
                if (err)
                    return reject(err);
                else {
                    return resolve(results);
                }
            });
        });
    };

    const removeAll = (req, res) => {

        return new Promise((resolve, reject) => {
            db.query(`truncate users`, function (err, results) {
                if (err)
                    return reject(err);
                else {
                    return resolve(results);
                }
            });
        });
    };


    return {
        findAll,
        findOne,
        create,
        update,
        remove,
        removeAll
    }
}

module.exports = UserModel;