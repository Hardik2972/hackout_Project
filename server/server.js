const express= require("express");
const cors= require("cors");
const bodyParser= require("body-parser");
const http= require("http");
const {Server}= require("socket.io");
const comment = require("./models/Comment");
const newUser= require("./routes/newUser");
const sendOtp= require("./routes/sendOtp");
const blogRoute= require("./routes/blog");
const {getUser} = require("./services/auth");
const { handleDeletePost, handleAddPost} = require("./controller/blogFunc");


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

io.on("connection",(socket) => {
  socket.on("add-comment",async(data)=>{
    const userComment= new comment();
    userComment.user_id = getUser(data.userToken)._id;
    userComment.post_id = data.comment.post_id;
    userComment.comment = data.comment.comment;
    const save= await userComment.save();
    socket.broadcast.emit("recieve-comments",{new:save});
  })
    //socket.broadcast.emit("recieve-comments",{new:save});

  socket.on("add-post",handleAddPost)
  //  socket.broadcast.emit("recieve-posts",{new:save});
  
  socket.on("delete-post",handleDeletePost)
});

app.use("/",newUser);
app.use("/otpVerification",sendOtp);
app.use("/api",blogRoute);

server.listen(8080, () => {
    console.log("server listening on port: 8080");
})