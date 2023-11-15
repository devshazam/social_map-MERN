const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {  type: String, required: true }, // имя или название компании
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "USER", enum: ["USER", "COMPANY", "SUPER"] }, // тип пользователя
    profile_image: { type: String, required: true, default: function() {
            if(this.role === "USER") return "https://img.icons8.com/bubbles/100/000000/user.png";
            if(this.role === "COMPANY") return "https://img.icons8.com/bubbles/100/company.png";
            if(this.role === "SUPER") return "https://img.icons8.com/bubbles/100/super-mario.png";
        }},
    birthday: { type: Date },
    email_status: { type: Boolean, required: true, default: false },
}, { timestamps: true });


const discountSchema = new Schema({
    name: {  type: String, required: true },
    description: {  type: String, required: true },

    // cost: { type: String, required: true },
    // discount: { type: Number, required: true },
    adCategory: { type: String, required: true },
    
    uniquePart: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    image: { type: String, required: true },
    currentTime: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" }

}, { timestamps: true });



const User = mongoose.model("User", userSchema);
const Discount = mongoose.model("Discount", discountSchema);



module.exports = { User, Discount };
