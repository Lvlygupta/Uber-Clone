const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const driverRoutes = require('./routes/driver.routes');
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



app.get('/',(req,res)=>{
    res.send('Hello World')
});
app.use('/users',userRoutes);
app.use('/driver',driverRoutes);
module.exports = app;