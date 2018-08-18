const Joi = require('joi');
const UserModelFn = require('../models/UsersModel');
const userModel = UserModelFn();

const UserController = () => {

    const findAll = (req, res) => {
        userModel.findAll(req, res)
            .then((results) => {
                res.json(results)
            })
            .catch((e) => {
                res.json(e)
            });
    };
    const findOne = (req, res) => {
        userModel.findOne(req, res)
            .then((results) => {
                res.json(results)
            })
            .catch((e) => {
                res.json(e)
            });
    };
    const create = (req, res) => {
        userModel.create(req, res)
            .then((results) => {
                res.json(results)
            })
            .catch((e) => {
                res.json(e)
            });
    };
    const update = (req, res) => {

        userModel.update(req, res)
            .then((results) => {
                res.json(results)
            })
            .catch((e) => {
                res.json(e)
            });

    };
    const remove = (req, res) => {
        userModel.remove(req, res)
            .then((results) => {
                res.json(results)
            })
            .catch((e) => {
                res.json(e)
            });
    };
    const removeAll = (req, res) => {
        userModel.removeAll(req, res)
            .then((results) => {
                res.json(results)
            })
            .catch((e) => {
                res.json(e)
            });
    };

    return {
        findAll,
        findOne,
        create,
        update,
        remove,
        removeAll
    };
};

module.exports = UserController;