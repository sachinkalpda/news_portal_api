
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

// if any error occures
db.on('error',console.error.bind(console,'Error in Connecting Database'));



// on success
db.once('open',() => {
    console.log('Connected to Database');
});

module.exports = db;