const S3 = require("aws-sdk/clients/s3");
const uuid = require("uuid");
const path = require("path");
// const fs2 = require('fs')
// const fs = require('fs').promises;
const fs = require("fs");

const uploadParams = { Bucket: process.env.BACKET, Key: "", Body: "" }; // <--- заменить

const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID, // <--- заменить
    secretAccessKey: process.env.SECRET_ACCESS_KEY, // <--- заменить
    endpoint: "https://s3.timeweb.com",
    s3ForcePathStyle: true,
    region: "ru-1",
    apiVersion: "latest",
});

const fileUploadCustom = async (img, pathName = "") => {
    const imgName = img.name;
    const fileName = uuid.v4() + "_" + imgName;
    await img.mv(path.resolve(__dirname, "..", "static", fileName));

    const stream = fs.createReadStream(
        __dirname + "/../" + "static/" + fileName
    );

    uploadParams.Body = stream;
    uploadParams.Key = pathName + fileName;
    const data = await s3.upload(uploadParams).promise();
    
    if(fileName){
        await fs.promises.unlink(__dirname + "/../" + "static/" + fileName);
    }
    return data.Location;
};

const xlsxUploadCustom = async (buffer) => {
    const uniqFileName = uuid.v4() + ".xlsx";

    fs.writeFile(
        __dirname + "/../" + "static/" + uniqFileName,
        buffer,
        function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        }
    );

    const stream = fs.createReadStream(
        __dirname + "/../" + "static/" + uniqFileName
    );

    uploadParams.Body = stream;
    uploadParams.Key = "xlsx/" + uniqFileName;
    const data = await s3.upload(uploadParams).promise();

    if(uniqFileName){
        await fs.promises.unlink(__dirname + "/../" + "static/" + uniqFileName);
    }
    return data.Location;
};

const fileDelete = async (object) => {
    const res = await s3.deleteObject(object).promise();
    return res;
};

module.exports = { fileUploadCustom, fileDelete, xlsxUploadCustom };
