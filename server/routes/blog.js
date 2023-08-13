const {hanadleMyPosts , handlePosts, handleUpdate, handleComments, handleProfile} = require("../controller/blogFunc");
const express= require("express");
const router= express.Router();

router.get("/",handlePosts);
router.post("/myPosts",hanadleMyPosts);
router.post("/update",handleUpdate);
router.get("/comment",handleComments);
router.post("/profile",handleProfile);

module.exports=router;