const express=require("express");
const PostDetail=require("../models/postschema")
const UserDetail=require("../models/userschema")
const router=express.Router();
const verifyToken= require("../middleware");

//middle-ware for json data
router.use(express.json());


router.post("/posts",verifyToken,async (req,res)=>{
    try{
        const result= await PostDetail.create({title : req.body.title,
            body : req.body.body,
            image : req.body.image
        });
        res.status(200).json({
        status:"successfull",
        result:result
    })
    }catch(e){
        res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})


router.get("/posts",verifyToken,async (req,res)=>{
    try{
        const result= await PostDetail.find();
        res.status(200).json({
        status:"successfull",
        result:result
    })
    }catch(e){
        res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})

router.put("/posts/:id",verifyToken,async (req,res)=>{
    try{
        const result= await PostDetail.updateOne({_id:req.params.id},req.body);
        res.status(200).json({
        status:"successfull",
        result:result
    })
    }catch(e){
        res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})

router.delete("/posts/:id",verifyToken,async (req,res)=>{
    try{
        const result= await PostDetail.deleteOne({_id:req.params.id},req.body);
        res.status(200).json({
        status:"successfull",
        result:result
    })
    }catch(e){
        res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})



module.exports=router;