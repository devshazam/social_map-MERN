const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {  type: String, required: true }, // имя или название компании
    phone: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    role: { type: String, default: "USER", enum: ["USER", "COMPANY", "SUPER"] }, // тип пользователя
    profile_image: { type: String, required: true, default: function() {
            if(this.role === "USER") return "https://img.icons8.com/bubbles/100/000000/user.png";
            if(this.role === "COMPANY") return "https://img.icons8.com/bubbles/100/company.png";
            if(this.role === "SUPER") return "https://img.icons8.com/bubbles/100/super-mario.png";
        }},
    birthday: { type: String },
    email_status: { type: Boolean, default: false },
}, { timestamps: true });


const discountSchema = new Schema({
    adCategory: { type: String, required: true },
    
    name: {  type: String, required: true },
    description: {  type: String, required: true },
    
    // common
    cost: { type: Number },

    // 1 - discounts
    discount: { type: Number },
    discountCategory: { type: String },
    
    // 3 - events
    startDate: { type: String },
    endDate: { type: String },

    //avito
    avitoCategory: { type: String },
    uniquePart: { type: String },

    district: { type: String },
    address: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    image: { type: String, required: true },
    currentTime: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" }

}, { timestamps: true });

const errorSchema = new Schema({
    name: {  type: String, required: true }, // имя или название компании
    message: { type: String },
    info: { type: String },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const Discount = mongoose.model("Discount", discountSchema);
const Error = mongoose.model("Error", errorSchema);



module.exports = { User, Discount, Error };
