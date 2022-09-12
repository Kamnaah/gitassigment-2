const express=require("express");
const bycrpt=require("bcrypt");
const jwt=require("jsonwebtoken");
const UserDetail = require("../models/userschema");
const router=express.Router();
//middle-ware: (req,res,next)
const middleware=(req,res,next)=>{
    console.log("inside middleware");
    next();
}

//middle-ware for json data
router.use(express.json());

//crud operation using postMan

router.post("/register",async(req,res)=>{
    try{
        const {name,email,phone_no,work,password,confirm_password} =req.body;

        const existUser=await UserDetail.findOne({email:email})
        if(existUser){
            return res.status(422).json({
                error: "user already exist!"
            })
        }
        else if(password!=confirm_password){
            return res.status(422).json({
                error: "password doesnot match!"
            })
        }
        else{
            const result=new UserDetail({name,email,phone_no,work,password,confirm_password});
            //run pre 
            await result.save()
            res.status(200).json({
                status:"success",
                details:result
            })
        }


    }catch(e){
        res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})
router.post("/login",async(req,res)=>{
    try{
        let token;
        const {email,password}= req.body;
        if(!email || !password){
            return res.status(400).send("please fill the details")
        }
        const userLogin = await UserDetail.findOne({email:email});
        //console.log(userLogin);
        if(userLogin){
            const isMatch = await bycrpt.compare(password,userLogin.password);
            token=await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken",token,{expires: new Date(Date.now()+25892000000),httpOnly:true})

        if(!isMatch){
            res.status(404).json({
                status:"failed",
                message:"invalid data password"
            })
        }
        else{
            res.status(200).json({
                status:"successfully",
                message:"login successfully",
                token:token
            })
        }

        }else{
            res.status(404).json({
                status:"failed",
                message:"invalid data email"
            })
        }
        
    }catch(e){
        res.status(404).json({
            status:"failed",
            message:e.message
        })
    }
})
// router.get("/register",async(req,res)=>{
//     try{
//         const result=await UserDetail.find();
//         res.status(200).json({
//             status:"success",
//             details:result
//         })

//     }catch(e){
//         res.status(404).json({
//             status:"failed",
//             message:e.message
//         })
//     }
// })

// router.patch("/register/:id",async(req,res)=>{
//     try{
//         const result=await UserDetail.updateOne({_id:req.params.id},req.body);
//         res.status(200).json({
//             status:"success",
//             details:result
//         })

//     }catch(e){
//         res.status(404).json({
//             status:"failed",
//             message:e.message
//         })
//     }
// })

// router.delete("/register/:id",async(req,res)=>{
//     try{
//         const result=await UserDetail.deleteOne({_id:req.params.id},req.body);
//         res.status(200).json({
//             status:"success",
//             details:result
//         })

//     }catch(e){
//         res.status(404).json({
//             status:"failed",
//             message:e.message
//         })
//     }
// })


module.exports =router;