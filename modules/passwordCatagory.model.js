const mongoose=require('mongoose');

const passCatagorySchema= new mongoose.Schema({
    passwordCatagory:{type:String,
        required:true,
    },
    date:{
        type:Date,
        default: Date.now
    }
});

const passCatagorySModel=mongoose.model("passwordCatagory",passCatagorySchema);
module.exports=passCatagorySModel;