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


//This is for Password catagory

router.get('/',checkLoginUser,(req,res,next)=>{
    const currentUser=localStorage.getItem('currentUser');
    getPasswordCat.exec()
    .then(data=>{
      res.render('passwordCatagory',{title: "Password catagory List", currentUser: currentUser ,errors:'', success:'', records:data})
    })
    .catch(err=>console.log(err));
  });
  
   //Process Update Catagory
   router.post('/',checkLoginUser,(req,res,next)=>{
    const {id,passwordCatagory}=req.body;
    const updatePassCat=passCatagoryModel.findByIdAndUpdate(id,{'passwordCatagory': passwordCatagory});
    updatePassCat.exec(function(err){
      if(err) throw err;
      res.redirect('/password-catagory')
    });
  });

  // Update password Catagory
  router.get('/edit/:id', checkLoginUser,(req,res,next)=>{
    const currentUser=localStorage.getItem('currentUser');
    const id= req.params.id;
    passCatagoryModel.findById(id)
    .then(data=>{
      res.render('editPassCatagory',{title: "Password catagory Edit", currentUser: currentUser ,errors:'', success:'', record:data})
    })
    .catch(err=>console.log(err))
  });
  
  
  //Delete password Catagory 
  router.get('/delete/:id', checkLoginUser,function(req,res,next){
    const currentUser=localStorage.getItem('currentUser');
    const id= req.params.id;
    passCatagoryModel.findByIdAndDelete(id)
    .then(data=>{
      res.redirect('/password-catagory');
    })
    .catch(err=>console.log(err))
  });
  
module.exports = router;