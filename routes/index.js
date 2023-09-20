
const express = require('express');

const router = express.Router();


router.get('/',(req,res) => {
    res.end('This is homepage');
})

router.use('/api',require('./api'));




module.exports = router;