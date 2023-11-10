const path = require("path");
const fs = require("fs");
const { appendFiles } = require("../error-log/LogHandling");
const {
    Discount, User
} = require("../models/models");
const ApiError = require("../error/ApiError");
const { fileUploadCustom, fileDelete } = require("../S3/s3Upload");
const axios = require("axios");

class DiscountController {


    async fetchYandexAddress(req, res, next) {

        let {address} = req.body;
        console.log(address)
        let addressVar;
        try {
            addressVar = await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.API_KEY_YANDEX_GEO}&geocode=${address.split(' ').join('+')}&format=json`)

            return res.json(addressVar.data);
        } catch (error) {
            await appendFiles(`\n601: ${error.message}`);
            return next(ApiError.internal(`601: ${error.message}`));
        }
    }



    async createDiscount(req, res, next) {
        const { address, name, description, district, category, discount, cost, latitude, longitude, userId } = req.body;

        try {
            let fileLocation = null;
            if (req.files) {
                fileLocation = await fileUploadCustom(
                    req.files.img,
                    "davse/discounts/"
                );
            }

            const midDiscount = await Discount.create({ address, name, description, district, category, discount, cost, image: fileLocation, latitude, longitude, userId });

            return res.json(midDiscount);
        } catch (error) {
            await appendFiles(`\n603: ${error.message}`);
            return next(ApiError.internal(`603: ${error.message}`));
        }
    }
    

    async fetchDiscountByMap(req, res, next) {
        const { district, category, discount, cost, latitude, longitude } = req.body;

        try {
            let fileLocation = null;
            if (req.files) {
                fileLocation = await fileUploadCustom(
                    req.files.img,
                    "davse/discounts/"
                );
            }

            const midDiscount = await Discount.create({ address, name, description, district, category, discount, cost, image: fileLocation, latitude, longitude, userId });

            return res.json(midDiscount);
        } catch (error) {
            await appendFiles(`\n603: ${error.message}`);
            return next(ApiError.internal(`603: ${error.message}`));
        }
    }
    // подбор скидок на странице


}

module.exports = new DiscountController();
