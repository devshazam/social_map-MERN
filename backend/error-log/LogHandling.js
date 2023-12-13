// const fs = require("fs");
// const path = require("path");
const {Error} = require("../models/models");

const recordBackendErrorToLog = async (data) => {
  console.log(101, __dirname, 'backend/error-log/log.txt');
  try{
    const errorRes = await Error.create({ errorDesc: JSON.stringify(['Backend', data.code, data.eMessage]) })
    console.log(errorRes);
  }catch (error) {
    console.log(error);
  }
  // try {
  //   let utc = new Date()
  //   data = data + `; ${utc}`
  //   await fs.promises.appendFile(`${__dirname}/log.txt`, data);
  // } catch (error) {
  //   console.log(error);
  // }
};


module.exports = { recordBackendErrorToLog };