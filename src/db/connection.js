const dotenv=require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const DB=process.env.DATABASE_URL
mongoose.connect(DB).then(()=>{
    console.log("connected to database");
}).catch((e)=>{
    console.log(e);
})
