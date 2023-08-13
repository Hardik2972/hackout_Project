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

  useEffect(()=>{
   getDB();
  },[])

  async function getDB(){
    const response= await fetch("http://localhost:8080/api",{
      method: "GET" ,
     })
     const result= await response.json();
     setNotes(result);
  }

  function addPost(Newnote){
    socket.emit("add-post" , {post:Newnote , userToken:localStorage.getItem("customToken")});
    getDB();
    /*
    socket.on("recieve-posts",(data)=>{
      /*
      setNotes(prev=>{
        return(
          [...prev,data.new]
        )
      });
    })
    */
  }

   return(
     <div style={{display:"flex" , flexFlow:"wrap" , flexDirection:"column" , alignItems:"center"}}>
	    <Header logout={props.logout}/>
      <CreateArea onAdd={addPost}/>
      {notes.map((noteItem) => {
          return (
            <Note
              key={noteItem._id}
              id={noteItem._id}
              userImage={noteItem.user_id.userImage}
              username={noteItem.user_id.username}
              title={noteItem.title}
              content={noteItem.content}
              postImage={noteItem.postImage}
              like={props.like}
              addComment={props.addComment}
              getComments={props.getComments}
            />
          );
        })}
      <Footer />
     </div>
   );
}

export default Secret;