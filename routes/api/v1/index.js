
const express = require('express');

const router = express.Router();



router.use('/user',require('./user'));
router.use('/category',require('./category'));
router.use('/articles',require('./article'));





module.exports = router;