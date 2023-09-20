const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    article_id : {
        type : String,
        unique : true,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    link : {
        type: String,
        required : true,
    },
    pubDate : {
        type : String,
        required : true,
    },
    image_url : {
        type : String,
        required : true,
    },
    category : [
            {
                type : String,
                required : true,
            }
    ],
    creator : {
        type : String,
        required : true,
    }

},{
    timeStamps : true,
});

const Article = mongoose.model('Article',articleSchema);

module.exports = Article;