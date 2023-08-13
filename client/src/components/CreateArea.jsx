import React, { useState } from "react";

function CreateArea(props) {
  const [post,setPost] = useState({
    title: "",
    content: "",
    myFile: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setPost(prevPost => {
      return {
        ...prevPost,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(post);
    setPost({
      title: "",
      content: "",
      myFile: ""
    });
    event.preventDefault();
  }

  async function handleFileUpload(e){
    const file= e.target.files[0];
    const base64= await convertToBase64(file);
    setPost({...post, myFile: base64});
  }

  return (
    <div>
      <form id="addPostForm" onSubmit={submitNote}>
        <input
          name="title"
          onChange={handleChange}
          value={post.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={post.content}
          placeholder="Take a note..."
          rows="3"
        />
        <input
          type="file" 
          lable="Image"
          name="MyFile"
          id="file-upload"
          accept=".jpeg, .png, .jpeg"
          placeholder="upload"
          onChange={(e) => handleFileUpload(e)}
        />
        
        <button>Post</button>
      </form>
    </div>
  );
}

export default CreateArea;

function convertToBase64(file){
  return new Promise((resolve,reject) => {
    const fileReader= new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (err) => {
      reject(err);
    }
  })
}