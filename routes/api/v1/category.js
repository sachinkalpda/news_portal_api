
const express = require('express');

const router = express.Router();
const categoryController = require('../../../controllers/api/v1/categoryController');
// route for adding static category data to db
router.post('/add',categoryController.add);

// route for getting all available categories from db
router.get('/all', categoryController.getAllCategories);



module.exports = router;