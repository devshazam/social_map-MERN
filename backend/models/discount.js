const mongoose = require("mongoose");
const { Schema } = mongoose;


const discountSchema = new Schema({
    name: {  type: String, required: true },
    description: {  type: String, required: true },
    cost: { type: String, required: true },
    cost_old: { type: String, required: true },
    discount: { type: Number, required: true },
    address: { type: String, required: true },
    coordinates: { type: [String], required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },


}, { timestamps: true });


const Discount = mongoose.model("Discount", discountSchema);

module.exports = { Discount };

