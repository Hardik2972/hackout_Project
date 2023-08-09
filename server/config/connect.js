require('dotenv').config()
const mongoose= require('mongoose')

mongoose
    .connect("mongodb://0.0.0.0:27017/userDetail", {useNewUrlParser:true})
    .then(()=>{console.log("Db connected")})
    .catch((err)=>{console.log(err)})