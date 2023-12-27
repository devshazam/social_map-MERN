const path = require("path");
const fs = require("fs");
const { recordBackendErrorToLog } = require("../error-log/LogHandling");
const {
    Discount, User, Error,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const { fileUploadCustom, fileDelete } = require("../S3/s3Upload");
const axios = require("axios");
const requestIp = require('request-ip');

class DiscountController {


    async fetchYandexAddress(req, res, next) {
        try {
            const {address} = req.body;
            const headers = {
                "Content-Type": "application/json",
                "Authorization": "Token " + process.env.API_KEY_FIND_ADDRESS_BY_ID,
                "X-Secret": process.env.SECRET_KEY_FIND_ADDRESS_BY_ID
                };
            const fyaQ1 = await axios.post(`https://cleaner.dadata.ru/api/v1/clean/address`, JSON.stringify([address]), {headers});
            const fyaQ2 = {result: fyaQ1.data[0].result, latitude: fyaQ1.data[0].geo_lat, longitude: fyaQ1.data[0].geo_lon};
            console.log(fyaQ2)
            return res.json(fyaQ2);
        } catch (error) {
            await recordBackendErrorToLog({code: 601, eMessage: error.message});
            return next(ApiError.internal(`601: ${error.message}`));
        }
    }


    async createDiscount(req, res, next) {
        try {
            const { adCategory } = req.body;
            let arrayPath = ['discounts/', 'charity/', 'events/', 'avito/'];
            // let fileLocation = null;
            // if (req.files) { 
                const fileLocation = await fileUploadCustom(
                    req.files.img,
                    "davse/" + arrayPath[ +adCategory - 1 ]
                );
            const currentTime = new Date().getTime();
            const cdQ1 = await Discount.create({ ...req.body, currentTime, image: fileLocation });
            return res.json(cdQ1);
        } catch (error) {
            await recordBackendErrorToLog({code: 602, eMessage: error.message});
            return next(ApiError.internal(`602: ${error.message}`));
        }
    }
    

    async fetchDiscountByMap(req, res, next) {
        try {
            const { adCategory, xLatitude, xLongitude, yLatitude, yLongitude, ...rest } = req.body;
            const agent2 = Object.fromEntries(Object.entries(rest).filter(([_, v]) => v != 0));

            const midDiscount = await Discount.find({adCategory, ...agent2})
            .where("latitude").gt(xLatitude).lt(yLatitude) // Additional where query
            .where("longitude").gt(xLongitude).lt(yLongitude) // Additional where query
            .select("latitude longitude discount currentTime name cost startDate")
            .populate('userId', 'name phone role')
            .exec();

            return res.json(midDiscount);
        } catch (error) {
            await recordBackendErrorToLog({code: 603, eMessage: error.message});
            return next(ApiError.internal(`603: ${error.message}`));
        }
    }

    
    async fetchAdsById(req, res, next) {
        try {
            const { adId } = req.body;

            const fabiQ1 = await Discount.findById(adId)
            .populate('userId', 'name phone')
            .exec();

            return res.json(fabiQ1);
        } catch (error) {
            await recordBackendErrorToLog({code: 604, eMessage: error.message});
            return next(ApiError.internal(`604: ${error.message}`));
        }
    }
    

    async fetchAdByIdForUser(req, res, next) {
        try {
            const { adId } = req.body;

            const fabifuQ1 = await Discount.findById(adId)
            .select("discount discountCategory startDate endDate avitoCategory uniquePart cost name description district address image dimensions adCategory")
            .exec();
            
            return res.json(fabifuQ1);
        } catch (error) {
            await recordBackendErrorToLog({code: 605, eMessage: error.message});
            return next(ApiError.internal(`605: ${error.message}`));
        }
    }



    async fetchAdsList(req, res, next) {
        try {
            let { itemSort, orderSort, page, limit, offset, ...rest }  = req.body;
            page = page || 1;
            limit = limit || 8;
            itemSort = itemSort || "createdAt";
            orderSort = orderSort || 1;
            offset = page * limit - limit;
            const sortArray = [1, -1];

            const agent2 = Object.fromEntries(Object.entries(rest).filter(([_, v]) => v != 0));

            const funcAgent1 = await Discount.find({...agent2}) // WHERE sport: Tennis 
            .skip(offset).limit(limit) // skip тоже самое что offset
            .sort({ [itemSort]: sortArray[+orderSort] })
            .select("name image address cost discount dimensions")
            .exec();
            return res.json(funcAgent1);
        } catch (error) {
            await recordBackendErrorToLog({code: 606, eMessage: error.message});
            return next(ApiError.internal(`606: ${error.message}`));
        }
    }


    async fetchUserAdsList(req, res, next) {
        try {
            let { page, userId }  = req.body;
            page = page || 1;
            let limit = 8;
            let offset = page * limit - limit;

            const funcAgent1 = await Discount.find({userId}) // WHERE sport: Tennis 
            .skip(offset).limit(limit) // skip тоже самое что offset
            .sort({ createdAt: -1 })
            .select("name image dimensions")
            .exec();
            return res.json(funcAgent1);
        } catch (error) {
            await recordBackendErrorToLog({code: 607, eMessage: error.message});
            return next(ApiError.internal(`607: ${error.message}`));
        }
    }
    
    
    async deleteUserAdsList(req, res, next) {
        try {
            let { adId }  = req.body;
            const dualQ1 = await Discount.findByIdAndDelete( adId );
            let dualQ2 = dualQ1.image.split("//")[1].split("/");
            let dualQ3 = await fileDelete({ Bucket: dualQ2[1] + "/" + dualQ2[2] + "/" +  dualQ2[3], Key: dualQ2[4] });
            // console.log(dualQ3)
            
            return res.json({status: "success"});
        } catch (error) {
            await recordBackendErrorToLog({code: 608, eMessage: error.message});
            return next(ApiError.internal(`608: ${error.message}`));
        }
    }



    async saveChangesOfDiscount(req, res, next) {
        let { _id, ...rest }  = req.body;
        try {
            // discount startDate endDate uniquePart cost name description 
            const funcAgent1 = await Discount.updateOne({ _id }, { ...rest });
console.log(funcAgent1)
            return res.json(funcAgent1);
        } catch (error) {
            await recordBackendErrorToLog({code: 609, eMessage: error.message});
            return next(ApiError.internal(`609: ${error.message}`));
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
//             await recordBackendErrorToLog({code: 610, eMessage: error.message});
//             return next(ApiError.internal(`610: ${error.message}`));
//         }
//     }

    
    async recordErrorToLog(req, res, next) {
        const { errorDesc } = req.body;
        try{
            const errorRes = await Error.create({ errorDesc });
            return res.json(errorRes);
        }catch (error) {
            await recordBackendErrorToLog({code: 611, eMessage: error.message});
            return next(ApiError.internal(`611: ${error.message}`));
        }
    }
    

    async checkNumbersOfAds(req, res, next){
        try{
            const { userId, adCategory } = req.body;
            const cnoaQ1 = await Discount.countDocuments({ userId, adCategory }).exec();
            return res.json(cnoaQ1);
        }catch (error) {
            await recordBackendErrorToLog({code: 612, eMessage: error.message});
            return next(ApiError.internal(`612: ${error.message}`));
        }
    }


    async errorTest(req, res, next) {
        try{
            throw new Error('this my error');
        }catch (error) {
            await recordBackendErrorToLog({code: 612, eMessage: error.message});
            return next(ApiError.internal(`612: ${error.message}`));
        }
    }
    async errorTestos(req, res, next) {
        r + 1;
        try{
            throw new Error('this my errorwwwwww');
        }catch (error) {
            await recordBackendErrorToLog({code: 612, eMessage: error.message});
            return next(ApiError.internal(`612: ${error.message}`));
        }
    }


    async getErrorsList(req, res, next) {
        try{
            const gelQ1 = await Error.find()
            .limit(10) // skip тоже самое что offset
            .sort({ ['createdAt']: -1 })
            .exec();
            return res.json(gelQ1);
        }catch (error) {
            await recordBackendErrorToLog({code: 612, eMessage: error.message});
            return next(ApiError.internal(`612: ${error.message}`));
        }
    }

}

module.exports = new DiscountController();
