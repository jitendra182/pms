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

//This is to get all password as List

router.get('/:page',checkLoginUser,(req,res,next)=>{
    const currentUser=localStorage.getItem('currentUser');
 
    let perPage=3;
    let page=req.params.page || 1;
    const passwordList= addPasswordModel.find();
    passwordList.skip((perPage*page)- perPage).limit(perPage).exec(function(err,data){
      if(err) throw err;
      addPasswordModel.countDocuments({})
      .then(count =>{
        //console.log(count);
        res.render('viewAllPassword',{title: "All Password",currentUser: currentUser, passwordList: data,
         currentPage:page, pages: Math.ceil(count/perPage)});
      })
      .catch(err=>console.log(err));
    });
   });
  // const passwordList=addPasswordModel.find();
   // passwordList.exec((err,data)=>{
   //   if(err) throw err;
   //   res.render('viewAllPassword',{title: "All Password",currentUser: currentUser, passwordList: data})
 // });
 // });

//Using mongoose Pagination Feature
router.get('/',checkLoginUser,(req,res,next)=>{
    const currentUser=localStorage.getItem('currentUser');
  
    // let perPage=3;
    //let page=req.params.page || 1;
    
    const options={
      offset: 1,
      limit: 3
    };
  
    addPasswordModel.paginate({},options)
    .then((result)=>{
      console.log(result)
      res.render('viewAllPassword',{title: "All Password",currentUser: currentUser, passwordList: result.docs,
      currentPage:result.offset, pages: Math.ceil(result.total/ result.limit)});
  
    });
  });
  
  
  // This is to Edit Password 
  router.get('/edit/:id',checkLoginUser,(req,res)=>{
    const currentUser=localStorage.getItem('currentUser');
  
    const id=req.params.id;
    passCatagoryModel.find()
    .then(data=>{
      addPasswordModel.findById(id)
      .exec((err,val)=>{
        if(err) throw err;
        res.render('editPassword',{title: "Update  Password", currentUser: currentUser, passwordCatagoryList:data, updateVal:val, status:'' })
      });
    })
    .catch(err=>console.log(err))
  });
  
  //Process Upadte Password Submission
  router.post('/edit',checkLoginUser,function(req,res){
    const currentUser=localStorage.getItem('currentUser');
    const id= req.body.id;
    const passwordCatagory=req.body.password_catagory
    const projectName=req.body.project_name;
    const passwordDetail=req.body.password_detail;
    const updatePassDetails=addPasswordModel.findByIdAndUpdate(id,{ 'passwordCatagory':passwordCatagory,'projectName':projectName, 'passwordDetail':passwordDetail});
    updatePassDetails
    .then(()=>{
      res.render('editPassword',{title: "Update  Password", currentUser: currentUser, passwordCatagoryList:"", updateVal:"", status:'Password Details Updated' });
    })
    .catch(err=>console.log(err));
  });
  
  //This is to delete Password
  router.get('/delete/:id',checkLoginUser,function(req,res){
    let id=req.params.id
    addPasswordModel.findByIdAndDelete(id)
    .then(()=>{
      res.redirect('/password-list/1');
    })
    .catch(err=>console.log(err));
  });
  
  
module.exports = router;
