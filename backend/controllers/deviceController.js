const path = require("path");
const fs = require("fs");
const { appendFiles } = require("../error-log/LogHandling");
// const {
//     Device,
// } = require("../models/models");
const ApiError = require("../error/ApiError");
const { fileUploadCustom, fileDelete } = require("../S3/s3Upload");


class DeviceController {


    // POST(_1_):
    async createDevice(req, res, next) {
        let { name, value, description, descriptionText, userId, goodId } =
            req.body;
        goodId = goodId || null;

        try {
            let fileLocation = null;
            if (req.files) {
                fileLocation = await fileUploadCustom(
                    req.files.img,
                    "devices/"
                );
            }
            const device = await Device.create({
                name,
                feature: description,
                userId,
                descriptionText,
                img: fileLocation,
                goodId,
                price: +value,
                basket: [
                    {userId}
                ]
            },
            {
              include: [Basket],
            });
            // await Basket.create({ userId, deviceId: device.id });

            return res.json(device);
        } catch (e) {
            appendFiles(`\n603: ${e.message}`);
            return next(ApiError.internal(`603: ${e.message}`));
        }
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

module.exports = new DeviceController();
