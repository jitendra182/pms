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
/* GET home page. */

//login  Page
router.get('/',function(req, res, next) {
  const currentUser=localStorage.getItem('currentUser');
  if(currentUser){
    res.redirect('/dashboard')
  }else{
    res.render('index', { title: 'Password Management System' , msg:''});
  }
});

// Submit Login page
router.post('/', function(req, res, next) {
  let {username, password }=req.body;
  const checkUser=userModel.findOne( {username});
  checkUser.then((data)=>{

    const existPass=data.password;
    const userId=data._id;
    if(bcrypt.compareSync(password,existPass)){
      var token=jwt.sign({userId:userId}, 'LoginToken')
      localStorage.setItem('userLoginToken',token);
      localStorage.setItem('currentUser',username);
      res.redirect('/dashboard');
    }
    else{
      res.render('index', { title: 'Password Management System', msg:"Username or Password Wrong" });
    }
    
  }).catch(err => console.log(err))
});





//Logout url
router.get('/logout',function(req,res,next){
  localStorage.removeItem('userLoginToken');
  localStorage.removeItem('currentUser');
  res.redirect("/")
});

//Sign up Page
router.get('/signup', function(req, res, next) {
  const currentUser=localStorage.getItem('currentUser');
  if(currentUser){
    res.redirect('/dashboard')
  }else{
    res.render('signup', { title: 'Password Management System' , msg:'' });
  }
});

// Check email is exist or not -- MiddleWare
function checkEmail(req,res,next){
  let email=req.body.email;
  let exitEmail=userModel.findOne({email:email});
  exitEmail.exec((err,data)=>{
    if(err) throw err;
    if(data){
      return res.render('signup', { title: 'Password Management System', msg: "User  already exist" , status:"danger"});
    }
    next();
  })
};

// Check username is exit or not --- MiddleWare
function checkUser(req,res,next){
  let uname=req.body.username;
  let exitUsername=userModel.findOne({username:uname});
  exitUsername.exec((err,data)=>{
    if(err) throw err;
    if(data){
      return res.render('signup', { title: 'Password Management System', msg: "Username already exit" , status:"danger"});
    }
    next();
  })
};

// function 


//Sign up Page processing
router.post('/signup',checkUser,checkEmail ,function(req, res, next) {
  let username=req.body.username;
  let email=req.body.email;
  let password=req.body.password;
  let cnfPassword=req.body.cnfPassword;

  if(password != cnfPassword){
    res.render('signup', { title: 'Password Management System', msg: "Password and Confirm pass Don't match" ,status:"danger" });
  }
  else{
    password= bcrypt.hashSync(req.body.password,10);
    const newUser=new userModel({
      username: username,
      email:email,
      password: password
    });
  
    newUser.save()
    .then(data =>{
      res.render('signup', { title: 'Password Management System', msg: "User  Registered Successfully" ,status:"success" });
    })
    .catch((err)=>{
      console.log(err)
    });
  }
});




module.exports = router;