```js

const sequelize = require('../db')
const {DataTypes} = require('sequelize')



const Device = sequelize.define('device', {
    // Данные товара
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}, // Название товара
    feature: {type: DataTypes.TEXT, allowNull: false}, // Хар-ки заказа (Все параметры в тексте + описание)
    img: {type: DataTypes.STRING}, // Ссылка на файл
    price: {type: DataTypes.STRING, allowNull: false}, // Стоимость товара
    // Данные клиента
    descriptionText: {type: DataTypes.TEXT, defaultValue: 'без описания'},
    // Готовность
    status_done: {type: DataTypes.BOOLEAN, defaultValue: false}, // Статус готовности - этот статус работники самостоятельно применяют при обработке заказа
    status_pay: {type: DataTypes.BOOLEAN, defaultValue: false}, // Статус оплаченности - статус заноситься при обратной переадресации на сайт после оплаты на стороне платежной системы

})

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

const Review = sequelize.define('review', {
    // Данные товара
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    theme: {type: DataTypes.STRING, allowNull: false}, // Название товара
    description: {type: DataTypes.TEXT, allowNull: false},
})

const Goods = sequelize.define('goods', {
    // Данные товара
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}, // Название товара
    description: {type: DataTypes.TEXT, allowNull: false}, // Хар-ки заказа (Все параметры в тексте + описание)
    image: {type: DataTypes.STRING, allowNull: false}, // Ссылка на файл
    price: {type: DataTypes.STRING, allowNull: false}, // Новая цена
    barcode: {type: DataTypes.STRING}, // Новая цена
    price_img: {type: DataTypes.STRING, allowNull: false}, // Новая цена
    artikul: {type: DataTypes.STRING}, // артикул товара
    group: {type: DataTypes.STRING, allowNull: false}, // группа товара
    summa: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false}, // группа товара

})

const Requisites = sequelize.define('requisites', {
    // Данные товара
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    director_full_name: {type: DataTypes.STRING, allowNull: false}, // Название товара
    inn: {type: DataTypes.STRING, allowNull: false}, // Название товара
    ogrn: {type: DataTypes.STRING, allowNull: false}, // Название товара
    bik: {type: DataTypes.STRING, allowNull: false}, // Название товара
    checking_account: {type: DataTypes.STRING, allowNull: false}, // Название товара
    bank_name: {type: DataTypes.STRING, allowNull: false}, // Название товара
    bank_address: {type: DataTypes.STRING, allowNull: false}, // Название товара
    kor_account: {type: DataTypes.STRING, allowNull: false}, // Название товара
    org_full_name: {type: DataTypes.STRING, allowNull: false}, // Название товара
    legal_address: {type: DataTypes.STRING, allowNull: false}, // Название товара
})

const Orders = sequelize.define('orders', {
    // Данные товара
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, allowNull: false},
    pay_id: {type: DataTypes.STRING}, // Для ID оплаты Юкасса - для отслеживания статуса оплаты
    status_pay: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false}, // Статус готовности - этот статус работники самостоятельно применяют при обработке заказа
    status_done: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false}, // Статус готовности - этот статус работники самостоятельно применяют при обработке заказа
    cashless_status: {type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false}, // Статус готовности - этот статус работники самостоятельно применяют при обработке заказа
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Price = sequelize.define('price', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.JSON, allowNull: false},

})

const Jsona = sequelize.define('jsona', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.JSON, allowNull: false},
},
{ timestamps: false })


Orders.hasMany(Basket)
Basket.belongsTo(Orders)

Device.hasOne(Basket)
Basket.belongsTo(Device)

User.hasMany(Basket)
Basket.belongsTo(User)

Orders.hasMany(Device)
Device.belongsTo(Orders)

User.hasMany(Orders)
Orders.belongsTo(User)

User.hasOne(Requisites)
Requisites.belongsTo(User)

User.hasMany(Device)
Device.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

User.hasMany(Goods)
Goods.belongsTo(User)

Goods.hasMany(Device)
Device.belongsTo(Goods)

module.exports = {
    User,
    Device,
    Review,
    Goods,
    Requisites,
    Orders,
    Basket,
    Price,
    Jsona
}





