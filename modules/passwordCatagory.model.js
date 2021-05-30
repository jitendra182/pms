const mongoose=require('mongoose');

const passCatagorySchema= new mongoose.Schema({
    passwordCatagory:{type:String,
        required:true,
        index:{ unique: true }
    },
    date:{
        type:Date,
        default: Date.now
    }
});

const passCatagoryModel=mongoose.model("passwordCatagory",passCatagorySchema);
module.exports=passCatagoryModel;