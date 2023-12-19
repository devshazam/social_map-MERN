const {Error} = require("../models/models");

const recordBackendErrorToLog = async (data) => {
  try{
    const errorRes = await Error.create({ errorDesc: JSON.stringify(['Backend', data.code, data.eMessage]) })
    console.log(errorRes);
  }catch (error) {
    console.log(error);
  }
};

module.exports = { recordBackendErrorToLog };