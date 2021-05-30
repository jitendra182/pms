const express=require("express");
const router=express.Router();

var passCatagoryModel=require("../modules/passwordCatagory.model");

const getPasswordCat=passCatagoryModel.find();


router.get('/',(req,res)=>{
    getPasswordCat
    .then(data=>{
        res.status(200).json({
            message:"Success",
            result: data
        });
    })
    .catch(err=>{
        console.log(err);
    });
});

router.post('/',(req,res)=>{
    const newPassCat=req.body.newPassCat;
    const savePassCat=new passCatagoryModel({
        passwordCatagory:newPassCat
    });
    // savePassCat.save()
    // .then(data=>{
    //     res.status(201).json({
    //         message:"Catagory inserted",
    //         result: data
    //     });
    // })
    // .catch(err=>{
    //     console.log(err);
    // });
    savePassCat.save()
    .then((doc)=>{
        res.status(201).json({
            message:"Catagory inserted",
            result: doc
        });
    })
    .catch((err)=>{
        console.log(err)
        res.json(err);
    });
});
router.put('/:id',(req,res)=>{
    const id=req.params.id;
    const updateCatgory=req.body.newPassCat;
    passCatagoryModel.findById(id)
    .then(data=>{
        data.passwordCatagory=updateCatgory;
        data.save().then(val=>{
            res.status(200).json({
                message:"Data updated",
                result: val
            });
        }).catch(err=>res.json(err));
    })
    .catch(err=>{
        console.log(err);
    });
});

router.patch('/:id',(req,res)=>{
    const id=req.params.id;
    const updateCatgory=req.body.newPassCat;
    passCatagoryModel.findById(id)
    .then(data=>{
        data.passwordCatagory=updateCatgory;
        data.save().then(val=>{
            res.status(200).json({
                message:"Data updated",
                result: val
            });
        }).catch(err=>res.json({
            message:" Invalid Id",
            result:err
        }));
    })
    .catch(err=>{
        console.log(err);
    });
});

router.delete("/:id",(req,res)=>{
    const id=req.params.id;
    passCatagoryModel.findByIdAndDelete(id)
    .then((data)=>{
        res.status(200).json({
            message:"Data deleted",
            result: data
        });
    })
    .catch(err=>res.json({
        message:"Invalid ID",
        result:err,
    }));
});

module.exports=router;
