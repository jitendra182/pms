const mongoose=require('mongoose');
// mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/pms',{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(()=>console.log("Connected to Database"))
.catch((err)=>console.log(err));


// mongoose.connect('mongodb://localhost:27017/employee', {
//      useUnifiedTopology: true,
//      useNewUrlParser: true,
//  })
// .then(() => console.log('DB Connected!'))
// .catch(err => {
//  console.log(`DB Connection Error: ${err.message}`);
// });

const userSchema=new mongoose.Schema({
    username:{ type: String,
        required: true,
        index:{ unique: true },
    },
    email:{ type:String,
        required: true,
        index:{ unique: true },
    },
    password :{ type:String,
        required: true,
    },
    date :{ type: Date,
    default: Date.now
    }
});


const userModel=mongoose.model("user",userSchema)

module.exports=userModel;
