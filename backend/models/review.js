const mongoose = require("mongoose");
const { Schema } = mongoose;


const reviewSchema = new Schema({
    title: {  type: String, required: true },
    description: {  type: String, required: true },

}, { timestamps: true });


const Review = mongoose.model("Review", reviewSchema);

module.exports = { Review };
