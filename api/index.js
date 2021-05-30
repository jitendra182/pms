var express = require('express');
var router = express.Router();

const userModel=require("../modules/user");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const { check, validationResult}=require('express-validator');

const passCatagoryModel=require('../modules/passwordCatagory.model');
const getPasswordCat=passCatagoryModel.find();
const addPasswordModel= require('../modules/addPassword');

//login  Page
router.get('/',function(req, res, next) {
 
});

// Submit Login page
router.post('/', function(req, res, next) {
  
});


//Logout url
router.get('/logout',function(req,res,next){

});

//Sign up Page processing
router.post('/signup',checkUser,checkEmail ,function(req, res, next) {

});




module.exports = router;