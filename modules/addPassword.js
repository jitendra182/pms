const mongoose= require('mongoose');
// mongoose.set('useCreateIndex', true);
const mongoosePaginate =require('mongoose-paginate');

const addPasswordSchema= new mongoose.Schema({
    passwordCatagory:{ type: String,
        require: true,
        index:{ unique: true},
    },
    projectName:{ type:String,
        required: true,
    },
    passwordDetail:{ type: String,
        required: true,    
    },
    date:{type: Date,
        default: Date.now
    }
});
addPasswordSchema.plugin(mongoosePaginate);
const addPasswordModel=mongoose.model('AddPassword',addPasswordSchema);
module.exports=addPasswordModel;