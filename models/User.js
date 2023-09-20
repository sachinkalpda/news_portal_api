
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required: true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    interests : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Category'
        }
    ],
    saved : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Article'
        }
    ]
}, {
    timestamps : true,
});

const User = mongoose.model('User',userSchema);

module.exports = User;