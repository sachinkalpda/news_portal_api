
const express = require('express');

const app = express();

const PORT = 8000;
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');
const passport = require('passport');
const passportJWT = require('./config/passport_jwt');
app.use(bodyParser.urlencoded());

const db = require('./config/mongoose');

app.use(cors());
app.use(passport.initialize());
app.use('/',require('./routes'))

app.listen(PORT, (error) => {
    if(error){
        console.log('Error in Starting Server',error);
        return;
    }
    console.log(`Server is Running on Port : ${PORT}`);
});