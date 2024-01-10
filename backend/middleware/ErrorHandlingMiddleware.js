const ApiError = require('../error/ApiError');
const {Error} = require("../models/models");

module.exports = async function (err, req, res, next) {
    if (err instanceof ApiError) {
        await Error.create({ errorDesc: JSON.stringify(['Backend', err.status, err.message])})
        return res.status(err.status).json({message: err.message})
    }
    await Error.create({ errorDesc: JSON.stringify(['Backend', 500, "Непредвиденная ошибка!"])})
    return res.status(500).json({message: "Непредвиденная ошибка!"})
}
