const express=require("express");
const jwt=require("jsonwebtoken");
const UserDetail = require("./models/userschema");
//importing connection
require("./db/connection");;
//import schema
// const UserDetail=require("./models/userschema")

const app=express();
const port=process.env.PORT | 3000;

//import router
app.use(require("./router/auth"));
app.use(require("./router/post"));



app.listen(port,()=>{
    console.log("connecter to server "+port);
})