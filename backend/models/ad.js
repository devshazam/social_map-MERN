const mongoose = require("mongoose");
const { Schema } = mongoose;


const adSchema = new Schema({
    name: {  type: String, required: true },
    description: {  type: String, required: true },
    cost: { type: Number, required: true }, //
    address: { type: String, required: true },
    coordinates: { type: [String], required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },


}, { timestamps: true });


const Ad = mongoose.model("Ad", adSchema);

module.exports = { Ad };
