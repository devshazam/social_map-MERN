const path = require("path");
const fs = require("fs");
const { appendFiles } = require("../error-log/LogHandling");
const {
    Discount, User, Error,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const { fileUploadCustom, fileDelete } = require("../S3/s3Upload");
const axios = require("axios");
const requestIp = require('request-ip');

class DiscountController {


    async fetchYandexAddress(req, res, next) {
        const {address} = req.body;
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Token " + process.env.API_KEY_FIND_ADDRESS_BY_ID,
            "X-Secret": process.env.SECRET_KEY_FIND_ADDRESS_BY_ID
            };

        try {
            const funcAgent1 = await axios.post(`https://cleaner.dadata.ru/api/v1/clean/address`, JSON.stringify([address]), {headers})
            const funcAgent2 = {result: funcAgent1.data[0].result, latitude: funcAgent1.data[0].geo_lat, longitude: funcAgent1.data[0].geo_lon};
            return res.json(funcAgent2);

                // addressVar = await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.API_KEY_YANDEX_GEO}&geocode=${address.split(' ').join('+')}&format=json`)
                // return res.json(addressVar.data);
            } catch (error) {
                await appendFiles(`\n601: ${error.message}`);
                return next(ApiError.internal(`601: ${error.message}`));
            }
    }



    async createDiscount(req, res, next) {
        const { adCategory } = req.body;
        let arrayPath = ['discounts/', 'avito/', 'charity/', 'events/'];
        try {
            let fileLocation = null;
            if (req.files) { 
                fileLocation = await fileUploadCustom(
                    req.files.img,
                    "davse/"+arrayPath[adCategory-1]
                );
            }
            const currentTime = new Date().getTime();
            const midDiscount = await Discount.create({ ...req.body, currentTime, image: fileLocation });
            return res.json(midDiscount);
        } catch (error) {
            await appendFiles(`\n603: ${error.message}`);
            return next(ApiError.internal(`603: ${error.message}`));
        }
    }
    

    async fetchDiscountByMap(req, res, next) {
        const { adCategory, xLatitude, xLongitude, yLatitude, yLongitude, district, discountCategory, avitoCategory } = req.body;
// console.log(avitoCategory)
        let midObject = {};
        if(district) midObject = { ...midObject, district };
        if(discountCategory) midObject = { ...midObject, discountCategory };
        if(avitoCategory) midObject = { ...midObject, avitoCategory };

        try {
            let midDiscount;

            midDiscount = await Discount.find({adCategory, ...midObject})
            .where("latitude").gt(xLatitude).lt(yLatitude) // Additional where query
            .where("longitude").gt(xLongitude).lt(yLongitude) // Additional where query
            .select("latitude longitude discount currentTime name")
            .populate('userId', 'name phone role')
            .exec();


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



        // Переделать на введение поисковых полей в объекте !!
                // find({
                //     occupation: /host/,
                //     'name.last': 'Ghost',
                //     age: { $gt: 17, $lt: 66 },
                //     likes: { $in: ['vaporizing', 'talking'] }
                // }).

        try {
            let midDiscount;

            midDiscount = await Discount.find()
        .where("adCategory").equals(adCategory) // WHERE sport: Tennis 
        .where("district").equals(district) // WHERE sport: Tennis 
        .skip(offset).limit(limit) // skip тоже самое что offset
        .sort({ [itemSort]: sortArray[+orderSort] })
        .select("name image address cost discount dimensions")
        .exec();

            return res.json(midDiscount);
        } catch (error) {
            await appendFiles(`\n603: ${error.message}`);
            return next(ApiError.internal(`603: ${error.message}`));
        }
    }


//     async checkIp(req, res, next) {



//         let clientIp = requestIp.getClientIp(req)
// console.log(clientIp)
// return

//         const headers = {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             "Authorization": "Token " + process.env.API_KEY_FIND_ADDRESS_BY_ID
//         };

//         try {
//             const midAddress = await fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=", {
//                 method: "GET",
//                 mode: "cors",
//                 headers,
//             });
// console.log(midAddress)
//             const addressObject = await midAddress.json();
// console.log(addressObject)
// return
//             return res.json(payItem);


//         } catch (error) {
//             await appendFiles(`\n603: ${error.message}`);
//             return next(ApiError.internal(`603: ${error.message}`));
//         }
//     }

    
    async recordErrorToLog(req, res, next) {

        try{
            const errorRes = Error.create({ ...req.body })
            return res.json(errorRes);
        }catch (error) {
            await appendFiles(`\n603: ${error.message}`);
            return next(ApiError.internal(`603: ${error.message}`));
        }
    }
}

module.exports = new DiscountController();
