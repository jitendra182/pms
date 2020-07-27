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

//This is to Add new Password
router.get('/',checkLoginUser,(req,res,next)=>{
    const currentUser=localStorage.getItem('currentUser');
    getPasswordCat
    .then(data=>{
      res.render('addnewPassword',{title: "Add New Password", currentUser: currentUser, passwordCatagoryList:data, status:""})
    })
    .catch(err=>console.log(err));
  });
  
  //Add new Password to Database
  router.post('/',checkLoginUser,(req,res)=>{
    const currentUser=localStorage.getItem('currentUser');
    let passCatagory=req.body.password_catagory;
    let projectName= req.body.project_name;
    let passwordDetail = req.body.password_detail;
    getPasswordCat.exec((err,data)=>{
      if(err) throw err;
      const newPass=new addPasswordModel({
        passwordCatagory: passCatagory,
        projectName: projectName,
        passwordDetail: passwordDetail
      });
      newPass.save()
      .then(()=>{
        res.render('addnewPassword',{title: "Add New Password", currentUser: currentUser, passwordCatagoryList:data, status:"Password inserted Successfully" })
      })
      .catch(err=>console.log(err))
    })
  });
  
module.exports= router;