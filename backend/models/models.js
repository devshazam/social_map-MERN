const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    isGoodBoy: {
        type: Boolean,
        required: false,
        default: true,
    },
});

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}, // Имя клиента
    phone: {type: DataTypes.STRING, allowNull: false}, // Телефон клиента
    email: {type: DataTypes.STRING, allowNull: false}, // Електронный адрес
    address: {type: DataTypes.STRING, defaultValue: null}, // Адрес
    password: {type: DataTypes.STRING, allowNull: false}, // Пароль
    role: {type: DataTypes.STRING, defaultValue: "USER"}, // Роль пользователя (USER/ADMIN)
    status_email: {type: DataTypes.BOOLEAN, defaultValue: false}, // Статус подтверждения почты - на почту приходит пароль.

})

const Dog = mongoose.model("Dog", DogSchema);

module.exports = { Dog };
