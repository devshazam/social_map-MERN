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
           let m1Object = {};
            JSON.parse(uniquePart).map((item) => {
                m1Object = {...m1Object, [item[0]]: item[1]}
            })
            const currentTime = new Date().getTime();
            const midDiscount = await Discount.create({ ...m1Object, address, name, description, district, adCategory, image: fileLocation, latitude, longitude, userId, currentTime });

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

    
    async fetchAdsById(req, res, next) {
        const { adId } = req.body;
        try {
            let midDiscount;
    
            midDiscount = await Discount.findById(adId)
            .populate('userId', 'name phone')
            .exec();


            return res.json(midDiscount);
        } catch (error) {
            await appendFiles(`\n603: ${error.message}`);
            return next(ApiError.internal(`603: ${error.message}`));
        }
    }

    async fetchAdsList(req, res, next) {
        let { adCategory, discountCategory, itemSort, orderSort, page, limit, district, offset }  = req.body;
        page = page || 1;
        limit = limit || 8;
        itemSort = itemSort || "createdAt";
        orderSort = orderSort || 0;
        offset = page * limit - limit;
        const sortArray = [1, -1];

        try {
            let midDiscount;

            midDiscount = await Discount.find()
        .where("adCategory").equals(adCategory) // WHERE sport: Tennis 
        .where("district").equals(district) // WHERE sport: Tennis 
        .skip(offset).limit(limit) // skip тоже самое что offset
        .sort({ [itemSort]: sortArray[+orderSort] })
        .select("name image address cost discount")
        .exec();

            return res.json(midDiscount);
        } catch (error) {
            await appendFiles(`\n603: ${error.message}`);
            return next(ApiError.internal(`603: ${error.message}`));
        }
    }


}

module.exports = new DiscountController();
