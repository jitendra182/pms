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

//Using mongoose Pagination Feature
router.get('/',checkLoginUser,(req,res,next)=>{
    const currentUser=localStorage.getItem('currentUser');
  
    addPasswordModel.aggregate([
        {
            $lookup:{
                from: "passwordcatagories",
                localField: "passwordCatagory",
                foreignField: "passwordCatagory",
                as: "passCatDetail"
            }
            
        },
    ]).exec((err,result)=>{
        if(err) throw err
        console.log(result);
        res.send(result)
    })
  });



  
module.exports = router;