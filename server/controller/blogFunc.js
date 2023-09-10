const User = require("../models/User");
const blog = require("../models/Blog");
const comment = require("../models/Comment");
const Report = require("../models/Report");
const {getUser} = require("../services/auth");

const handleReport = async (req,res)=>{
    const {time,text,ComplaintCases} = req.body;
    const userReport = new Report();
    userReport.problem=text;
    userReport.complaintCases=ComplaintCases;
    userReport.timeOfIncident=time;
    await userReport.save();
    return res.redirect("http://localhost:3000/");
}

async function hanadleMyPosts(req,res){
    const blogs= await blog.find({user_id: getUser(req.body.userToken)._id}).populate('user_id');
    res.json(blogs);
}

async function handlePosts(req,res){
    const blogs= await blog.find().populate('user_id');
    res.json(blogs);
}

async function handleUpdate(req,res){
    const id= getUser(req.body.userToken)._id;
    const del= await User.findOneAndUpdate({_id: id},{username:req.body.user.name , contact:req.body.user.contact});
    res.json(id);
}

async function handleComments(req,res){
    const comments= await comment.find({post_id: req.query.id}).populate('user_id');
    res.json(comments);
}

async function handleProfile(req,res){
    const profile=await User.find({_id: getUser(req.body.userToken)._id});
    res.json(profile);
}

async function handleAddcomment(data){
    const userComment= new comment();
    userComment.user_id = getUser(data.userToken)._id;
    userComment.post_id = data.comment.post_id;
    userComment.comment = data.comment.comment;
    const save= await userComment.save();
}

async function handleDeletePost(data){
    await comment.deleteMany({post_id: data.post.id});
    const del= await blog.findOneAndDelete({_id: data.post.id});
}

async function handleAddPost(data){
    const user= new blog();
    user.user_id = getUser(data.userToken)._id;
    user.title = data.post.title;
    user.content = data.post.content;
    user.postImage = data.post.myFile;
    user.likes = 0;
    const save= await user.save();
}

module.exports= {hanadleMyPosts , handlePosts, handleUpdate, handleComments, handleProfile, handleAddcomment, handleDeletePost, handleAddPost, handleReport};

