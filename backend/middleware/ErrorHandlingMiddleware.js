const ApiError = require('../error/ApiError');
const {Error} = require("../models/models");

module.exports = async function (err, req, res, next) {
    if (err instanceof ApiError) {
        try{
            await Error.create({ errorDesc: JSON.stringify(['Backend', err.status, err.message])})
        }catch (error) {
            console.log(error);
        }
        return res.status(err.status).json({message: err.message})
    }

    console.log(`Код: 555; Текст ошибки: "Непредвиденная ошибка!"`)
    return res.status(500).json({message: "Непредвиденная ошибка!"})
}
