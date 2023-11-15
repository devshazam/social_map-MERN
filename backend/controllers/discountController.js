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
        const { address, name, description, district, uniquePart, latitude, longitude, userId, adCategory } = req.body;
console.log(uniquePart)
        try {
            let fileLocation = null;
            if (req.files) {
                fileLocation = await fileUploadCustom(
                    req.files.img,
                    "davse/discounts/"
                );
            }
            const currentTime = new Date().getTime();
            const midDiscount = await Discount.create({ address, name, description, district, uniquePart, adCategory, image: fileLocation, latitude, longitude, userId, currentTime });

            return res.json(midDiscount);
        } catch (error) {
            await appendFiles(`\n603: ${error.message}`);
            return next(ApiError.internal(`603: ${error.message}`));
        }
    }
    

    async fetchDiscountByMap(req, res, next) {
        const { category, xLatitude, xLongitude, yLatitude, yLongitude } = req.body;

        try {
            let midDiscount;
            if(category == 0 ){
            midDiscount = await Discount.find()
            .where("latitude").gt(xLatitude).lt(yLatitude) // Additional where query
            .where("longitude").gt(xLongitude).lt(yLongitude) // Additional where query
            .select("latitude longitude")
            .exec();
            }else{
            midDiscount = await Discount.find()
            .where("category").equals(category) // WHERE sport: Tennis 
            .where("latitude").gt(xLatitude).lt(yLatitude) // Additional where query
            .where("longitude").gt(xLongitude).lt(yLongitude) // Additional where query
            .select("latitude longitude discount currentTime name")
            .exec();
            }

            return res.json(midDiscount);
        } catch (error) {
            await appendFiles(`\n603: ${error.message}`);
            return next(ApiError.internal(`603: ${error.message}`));
        }
    }
    // подбор скидок на странице


}

module.exports = new DiscountController();
