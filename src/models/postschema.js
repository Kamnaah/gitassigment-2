const mongoose = require("mongoose");
const PostSchema=new mongoose.Schema({
    title:{type: String , required:true} , 
    body:{type: String , required:true},
    image:{type:String ,required:true }
})

const PostDetail= mongoose.model("PostDetail",PostSchema)

module.exports=PostDetail;