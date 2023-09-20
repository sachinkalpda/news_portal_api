
const express = require('express');

const router = express.Router();
const articleController = require('../../../controllers/api/v1/articleController');
const passport = require('passport');

// route for suggested article by preferences
router.get('/suggested',articleController.suggested);


// route for getting categorywise articles
router.get('/category/:category',articleController.getArticleByCategory);

// route for getting headlines
router.get('/headlines',articleController.topHeadlines);


// router.get('/:title',articleController.getArticleByTitle);

// route for searching the article
router.get('/search',articleController.searchArticle);


// router.get('/all', categoryController.getAllCategories);



module.exports = router;