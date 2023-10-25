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
    reviews: { type: Schema.Types.ObjectId, ref: "Review" },
    ads: { type: Schema.Types.ObjectId, ref: "Ad" },
    discounts: { type: Schema.Types.ObjectId, ref: "Discount" }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);

module.exports = { User };
