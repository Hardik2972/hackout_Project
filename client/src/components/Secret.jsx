import {useState,useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import Note from "./Note";
import Userposts from "./userPosts";
import io from 'socket.io-client';

const socket= io.connect("http://localhost:8080")

function Secret(props){
  const [notes, setNotes] = useState([]);
  const [flag,setFlag] = useState(1);
  useEffect(() => {
    getDB();
  },[]);

  /*
  useEffect(() => {
    socket.on("recieve-posts", (data) => {
      if(flag === 1){
        document.getElementById("newPost").innerHTML="new post";
      }
    })
  },[socket]);

/*
  useEffect(() => {
    socket.on("new-posts", (data) => {
      flag === 1? getDB() : getMyPosts();
    })
  },[socket]);
*/
  async function getDB(){
    const response= await fetch("http://localhost:8080/api",{
      method: "GET" ,
     })
     const result= await response.json();
     setNotes(result);
  }

  async function getMyPosts(){
    console.log("getMyPosts");
    const response= await fetch("http://localhost:8080/api/myPosts",{
      method: "POST" ,
      body: JSON.stringify({userToken:localStorage.getItem("customToken")}) ,
      headers:{
        "Content-Type": "application/json",
      }
     })
     const result= await response.json();
     setNotes(result);
  }

  function addPost(Newnote){
    console.log(Newnote);
    socket.emit("add-post" , {post:Newnote , userToken:localStorage.getItem("customToken")});
    getDB();
  }
  
  function deletePost(ele) {
    socket.emit("delete-post" , {post:ele});
    getMyPosts();
  }

  function changeFlag(val){
    console.log(val)
    if(val == 1){
      getDB();
      setFlag(1);
    } 
    else{
      getMyPosts();
      setFlag(0);
    }
  }

   return(
     <div style={{display:"flex" , flexFlow:"wrap" , flexDirection:"column" , alignItems:"center"}}>
	    <Header logout={props.logout} getProfile={props.getProfile} upDate={props.upDate}/>
      <CreateArea flag={changeFlag} onAdd={addPost}/>
      {flag === 1 ?
        notes.map((noteItem) => {
          return (
            <Note
              key={noteItem._id}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              postImage={noteItem.postImage}
              like={props.like}
              addComment={props.addComment}
              getComments={props.getComments}
            />
          );
        }) : 
        notes.map((noteItem) => {
          return (
            <Userposts
              key={noteItem._id}
              id={noteItem._id}
              title={noteItem.title}
              content={noteItem.content}
              postImage={noteItem.postImage}
              onDelete={deletePost}
              addComment={props.addComment}
              getComments={props.getComments}
            />
          );
        })
      }
      <Footer />
     </div>
   );
}

export default Secret;