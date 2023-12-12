// const models = require('./models/models')

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const mongoose = require('mongoose')


const PORT = process.env.PORT || 5000
const app = express()

// app.use(cors({origin: ["https://kopi34.ru","http://localhost:3000"]}));
app.use(cors());
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router) 
app.use(errorHandler)
app.get('/', (req, res) => {
  res.send("GET Request Called")
})

const start = async () => {
    try {
        await mongoose.connect(
            // `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/discounts`
            `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/davseloc?authSource=admin`
        );
        app.listen(PORT, () => console.log("Server started on port 5000"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();





