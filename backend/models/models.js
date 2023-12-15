const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {  type: String, required: true }, // имя или название компании
    phone: { type: String, default: "0" },
    email: { type: String, required: true },
    password: { type: String, default: "0" },
    role: { type: String, default: "USER", enum: ["USER", "COMPANY", "SUPER"] }, // тип пользователя
    profile_image: { type: String, required: true, default: function() {
            if(this.role === "USER") return "https://img.icons8.com/bubbles/100/000000/user.png";
            if(this.role === "COMPANY") return "https://img.icons8.com/bubbles/100/company.png";
            if(this.role === "SUPER") return "https://img.icons8.com/bubbles/100/super-mario.png";
        }},
    birthday: { type: String },
    email_status: { type: Boolean, default: false },
    score: { type: Number, default: 10 },
    district: { type: String },
    address: { type: String },
    latitude: { type: String },
    longitude: { type: String },
}, { timestamps: true });


const discountSchema = new Schema({
    // 1 - discounts
    discount: { type: String },
    discountCategory: { type: String },
    
    // 3 - events
    startDate: { type: String },
    endDate: { type: String },
    
    //avito
    avitoCategory: { type: String },
    uniquePart: { type: String },
    
    // common
    cost: { type: String },
    adCategory: { type: String, required: true },
    name: {  type: String, required: true },
    description: {  type: String, required: true },
    district: { type: String },
    address: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    image: { type: String, required: true },
    dimensions: { type: String, required: true },
    currentTime: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" }

}, { timestamps: true });

const errorSchema = new Schema({
    errorDesc: {  type: String, required: true }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const Discount = mongoose.model("Discount", discountSchema);
const Error = mongoose.model("Error", errorSchema);



module.exports = { User, Discount, Error };
