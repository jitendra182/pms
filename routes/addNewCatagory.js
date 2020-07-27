var express = require('express');
var router = express.Router();

const userModel=require("../modules/user");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const { check, validationResult}=require('express-validator');

const passCatagoryModel=require('../modules/passwordCatagory.model');
const getPasswordCat=passCatagoryModel.find();
const addPasswordModel= require('../modules/addPassword');

//LocalStorage in Node
if(typeof localStorage === "undefined" || localStorage === null){
  const LocalStorage= require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch')
}

//Check Logged in User -- MiddleWare
function checkLoginUser(req,res,next){
  try {
    let loginToken =localStorage.getItem('userLoginToken');
    var decoded= jwt.verify(loginToken,'LoginToken');
  } catch (error) {
    res.redirect("/");
  }
  next();
}


//This is for Adding new Password Catagory
router.get('/',checkLoginUser,(req,res,next)=>{
    const currentUser=localStorage.getItem('currentUser');
      res.render('addNewCatagory',{title: "Add New Catagory", currentUser: currentUser ,errors:'', success:'', records:''})
  });

//This is to submit the add password catagory form
router.post('/',checkLoginUser, [check('passwordCatagory','Enter Password Catagory Name').isLength({min: 1})],(req,res,next)=>{
    const currentUser=localStorage.getItem('currentUser');
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      res.render('addNewCatagory',{title: "Add New Catagory", currentUser: currentUser, errors: errors.mapped(), success:''})
    }else{
      const enteredpasswordCatagory=req.body.passwordCatagory;
      const newPasswordCatagory =new passCatagoryModel({
        passwordCatagory:enteredpasswordCatagory,
      });
      newPasswordCatagory.save()
      .then((data)=>{
        res.render('addNewCatagory',{title: "Add New Catagory", currentUser: currentUser, errors:'' , success: "Password Catagory Inserted Successfully"})
      })
      .catch((err)=>{
        console.log(err)
      });
    }
  });

  module.exports=router;