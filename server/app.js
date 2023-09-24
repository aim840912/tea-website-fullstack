const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path');
const dotenv = require('dotenv')

dotenv.config();

const contactRoutes = require('./routes/contact');
const twitchRoutes = require('./controllers/twitch-router')
const facebookRoutes = require('./controllers/facebook-router')
const bulletinRoutes = require('./controllers/bulletin-router')
const productRoutes = require('./controllers/product-router')
const testdbRouter = require('./controllers/testdb-router')

const app = express()

app.use(express.json({limit: "30mb",extended:true}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});



app.use('/contact', contactRoutes);
app.use('/twitchLogin', twitchRoutes);
app.use('/authenticate/facebook',facebookRoutes);
app.use('/product', productRoutes);
app.use('/bulletin', bulletinRoutes);
app.use('/createtestdb', testdbRouter);

mongoose
    .connect(process.env.DB_CONNECT).then(() => {
        console.log('connent to mongo altas')
    })
    .then(() => {
        app.listen(process.env.PORT || 8080)
    })
    .catch((err) => {
        console.log(err)
    })