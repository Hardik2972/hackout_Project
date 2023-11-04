const {handleReport} = require("../controller/adminFunc");
const express= require("express");
const router= express.Router();

router.get("/report",handleReport);

module.exports=router;