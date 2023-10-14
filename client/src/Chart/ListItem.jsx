import {Routes, Route, useNavigate} from 'react-router-dom';
import useState from "react";

function Item(props){
   
   return(
      <>
         <hr />
         <div style={{display:"flex",width:"100%",justifyContent:"space-around",backgroundColor:"#DCDCDC", padding:"30px", borderRadius:"10px"}}>
            <div style={{width:"8vw"}}>{props.Date}</div>
            <div style={{width:"2vw"}}>{props.Time}</div>
            <div style={{width:"5vw"}}>{props.Problem}</div>
            <div style={{width:"18vw"}}>
               <p className="long-text">{props.Complaint}</p>
               <button id="show-more" onClick={(e)=>{
                 let text = document.getElementsByClassName("long-text");
                 if(text[props.index].style.overflow === ""){
                     text[props.index].style.maxHeight = "95px";
                     text[props.index].style.overflow = "hidden";
                     e.target.innerHTML = "Show More";
                 }
                 if(text[props.index].style.overflow === "hidden"){
                     text[props.index].style.maxHeight = "fit-content";
                     text[props.index].style.overflow = "visible";
                     e.target.innerHTML = "Show Less";
                 }
                 else{
                     text[props.index].style.maxHeight = "95px";
                     text[props.index].style.overflow = "hidden";
                     e.target.innerHTML = "Show More";
                 }
               }}>Show More</button>
            </div>

            <div style={{width:"2vw"}}>{props.Seriousness}</div>
            <div style={{width:"2vw"}}><button className="button" onClick={()=>{

               const imageWindow = window.open('', 'ImageWindow');
               imageWindow.document.write('<html><head><title>Image</title></head><body>');
               imageWindow.document.write(`<img src="${props.Image}" alt="Base64 Image" />`);
               imageWindow.document.write('</body></html>');

            }}>view</button></div>
            <div style={{width:"2vw"}}><button className="button" onClick={()=>{
               window.open(props.Location, '_blank')
            }}>see</button></div>
            <div style={{width:"2vw"}}><button className="button" style={{backgroundColor:"red"}}>close</button></div>
         </div>
      </>
   );
}

export default Item;