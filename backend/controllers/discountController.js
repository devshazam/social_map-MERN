const path = require("path");
const fs = require("fs");
const { appendFiles } = require("../error-log/LogHandling");
// const {
//     Device,
// } = require("../models/models");
const ApiError = require("../error/ApiError");
const { fileUploadCustom, fileDelete } = require("../S3/s3Upload");
const axios = require("axios");

class DiscountController {


    // POST(_1_):
    async createDiscount(req, res, next) {

        let { address } = req.body;
        console.log(address)
        let addressVar;
        try {
            addressVar = await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.API_KEY_YANDEX_GEO}&geocode=${address.split(' ').join('+')}&format=json`)

            return res.json(addressVar.data);
        }catch (error) {
            console.log(error)
        }


        // export const createDevice = async (device) => {
        //     const {data} = await $authHost.post('/api/device/create-device', device)
        //     console.log(data)
        //     return data
        // }

        //https://geocode-maps.yandex.ru/1.x/?apikey=3e6d3b83-c407-47b9-96a7-a95044775ca2&geocode=1&format=json
        // let { name, value, description, descriptionText, userId, goodId } =
        //     req.body;
        // goodId = goodId || null;
        //
        // try {
        //     let fileLocation = null;
        //     if (req.files) {
        //         fileLocation = await fileUploadCustom(
        //             req.files.img,
        //             "devices/"
        //         );
        //     }
        //     const device = await Device.create({
        //         name,
        //         feature: description,
        //         userId,
        //         descriptionText,
        //         img: fileLocation,
        //         goodId,
        //         price: +value,
        //         basket: [
        //             {userId}
        //         ]
        //     },
        //     {
        //       include: [Basket],
        //     });
            // await Basket.create({ userId, deviceId: device.id });

            // return res.json(device);
        // } catch (e) {
        //     appendFiles(`\n603: ${e.message}`);
        //     return next(ApiError.internal(`603: ${e.message}`));
        // }
    }




    // получить все заказы корзины клиента
    // POST(_5_): `api/device/` + `/basket`
    async fetchBasketDevices(req, res, next) {
        const { userId } = req.body;
        try {
            const basketMid = await Basket.findAll({
                where: { userId, orderId: null },
                attributes: ['deviceId']
            });
            const deviceMid = await Device.findAll({
                where: { id: basketMid.map(item => item.deviceId) },
            })
            return res.json(deviceMid);
        } catch (e) {
            appendFiles(`\n605: ${e.message}`);
            return next(ApiError.internal(`605: ${e.message}`));
        }
    }

    
    async fetchUserByOrderId(req, res, next) {
        const { orderId } = req.body;

        try {
            const midUser = await Orders.findOne({
                where: { id: orderId }, 
                include: [User]
            });
            return res.json(midUser);
        } catch (e) {
            appendFiles(`\n603: ${e.message}`);
            return next(ApiError.internal(`603: ${e.message}`));
        }
    }



}

module.exports = new DiscountController();
