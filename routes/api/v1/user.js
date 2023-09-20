
const express = require('express');

const router = express.Router();
const userController = require('../../../controllers/api/v1/userController');
const passport = require('passport');
// new user registration route
router.post('/register',userController.register);

// login route for user
router.post('/login',userController.login);

// user profile route 
router.get('/profile',passport.authenticate('jwt',{session:false}),userController.profile);

// saving user's interest routes
router.post('/save-interest',passport.authenticate('jwt', {session : false}),userController.addInterest);

// removing user's interest routes
router.post('/remove-interest',passport.authenticate('jwt',{session: false}),userController.removeInterest);


// saving article
router.post('/save-article',passport.authenticate('jwt',{session : false}), userController.saveArticle);

// remove articles
router.post('/remove-article',passport.authenticate('jwt',{session : false}), userController.removeArticle);


module.exports = router;