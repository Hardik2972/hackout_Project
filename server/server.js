const express= require("express");
const cors= require("cors");
const bodyParser= require("body-parser");
const User = require("./models/User");
const blog = require('./models/Blog');
const comment = require('./models/Comment');
const {setUser,getUser} = require("./service/auth");
const sendEmail = require("./mail");
const http= require("http");
const {Server}= require("socket.io");


const app= express();

const server= http.createServer(app);

const io= new Server(server,{
   maxHttpBufferSize: 1e7,
   cors:{
     origin: "http://localhost:3000",
     methods: ["GET","POST"]
   },
});
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));

app.get("/",(req,res) => {
  res.redirect("/login");
})

app.route("/login")
.get((req,res) => {
    res.status(300).json({url: "/"});
})
.post(async(req,res) => {
  const username = req.body.email
  const password = req.body.password
  try{
    var user = await User.findOne({email:username})
    console.log(user)
    if(!user){
      res.redirect("/login")
    } else{
      user.comparePasswords(password, (err,match) =>  {
        if(!match){
          res.redirect("/login")
        } else{
          const token = setUser(user)
          res.status(200).json({
            customToken: token,
            url: "/secret"
          })
        }
      })
    }
  }catch(e){
    console.log(e);
  }
})

app.route("/signup")
.get((req,res) => {
  res.status(300).json({url: "/signup"});
})
.post((req,res) => {
  const user = new User({
    username:req.body.username,
    contact:req.body.contact,
    email:req.body.email,
    password:req.body.password,
    userImage:req.body.MyFile
  })

  user.save()
    .then((user) => {
      const token = setUser(user)
      res.json({
        customToken: token,
        url: "/secret"
      })
    })
    .catch((error) => {
      res.status(200).redirect("/signup")
    })
})

app.get("/api",async(req,res) => {
  const blogs= await blog.find();
  res.json(blogs);
})

app.post("/api/myPosts",async(req,res) => {
  const blogs= await blog.find({user_id: getUser(req.body.userToken)._id});
  res.json(blogs);
})

app.post("/api/update",async(req,res) => {
  const id= getUser(req.body.userToken)._id;
  const del= await User.findOneAndUpdate({_id: id},{username:req.body.user.name , contact:req.body.user.contact});
  res.json(id);
})

app.route("/api/comment")
.get(async(req,res) => {
  const comments= await comment.find({post_id: req.query.id});
  res.json(comments);
})

app.post("/api/profile",async(req,res) => {
  const profile=await User.find({_id: getUser(req.body.userToken)._id});
  res.json(profile);
})

app.get("/otpVerification",async(req,res)=> {
    const otp= await sendEmail(req.query.id);
    res.status(200).send(otp)
})

io.on("connection",(socket) => {
  socket.on("add-comment",async(data)=>{
    const userComment= new comment();
    userComment.user_id = getUser(data.userToken)._id;
    userComment.post_id = data.comment.post_id;
    userComment.comment = data.comment.comment;
    const save= await userComment.save();
    socket.broadcast.emit("recieve-comments",{new:save});
  })
  socket.on("add-post",async(data)=>{
    const user= new blog();
    user.user_id = getUser(data.userToken)._id;
    user.title = data.post.title;
    user.content = data.post.content;
    user.postImage = data.post.myFile;
    user.likes = 0;
    const save= await user.save();
    socket.broadcast.emit("recieve-posts",{new:save});
  })
  socket.on("delete-post",async(data)=>{
    await comment.deleteMany({post_id: data.post.id});
    const del= await blog.findOneAndDelete({_id: data.post.id});
    socket.broadcast.emit("new-posts",{data});
  })
});

app.post("/authenticate",async(req,res)=>{
  const tokenUser= getUser(req.body.userToken);
  console.log(tokenUser);
    if(tokenUser){
        const username = tokenUser.email
        try{
            var user = await User.findOne({email:username})
            if(!user){
            return res.redirect("/login")
            } else{
              return res.status(200).send();
            }
        } catch(e){
            console.log(e);
        }}
    return res.status(300).send();
})

server.listen(8080, () => {
    console.log("server listening on port: 8080");
})