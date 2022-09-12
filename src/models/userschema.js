const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true , unique:true},
    phone_no:{type:Number,required:true},
    work:{type:String,required:true},
    password:{type:String,required:true},
    confirm_password:{type:String,required:true},
    tokens:[{
        token:{
            type:String,required:true
        }

    }]
})

UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        console.log("inside bycrpt")
        this.password= await bcrypt.hash(this.password,12);
        this.confirm_password= await bcrypt.hash(this.confirm_password,12);
        next();
    }
})

//generating 
UserSchema.methods.generateAuthToken = async function(){
    try{
        let token=jwt.sign({_id:this._id}, process.env.SECRET_KEY)
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(e){
        console.log(e);
    }
}

const UserDetail=mongoose.model("UserDetail",UserSchema);

module.exports=UserDetail;