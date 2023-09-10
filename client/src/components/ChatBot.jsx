import react, {useEffect, useState} from 'react';

function ChatBot(){
    const [data, setData]=useState([{answer:"Hello I am your Saheli and I'd be happy to assist you"}]);
    const [query,setQuery] = useState("");

    const fetchData = async()=>{
       const response = await fetch("http://localhost:5000/predict",{
         method:"POST",
         body:JSON.stringify({
            "message":query
         }),
         headers:{
            "Content-Type": "application/json",
          }
       })
       const res= await response.json();
       console.log(res);
       setData((prev)=>[...prev,res]);
       console.log(data);
    }
    return(
        <div style={{display:"flex",flexFlow:"column"}}>
            {
                data.map((e,idx)=>{
                    var flt= idx%2?"right":"left";
                    console.log(flt)
                    return(
                        <div key={idx} style={{textAlign:"center",float:"left"}}>
                            <hr />
                            <div style={{float:flt}}>{e.answer}</div>
                        </div>
                    )
                })
            }
            <div style={{alignSelf:"flex-end",position:"absolute",bottom:"0px"}}>
                <input placeholder='ask your question' onChange={(e)=>{
                   setQuery(e.target.value);
                }} 
                    value={query}
                />
                <button style={{borderRadius:"10px",float:"right"}} onClick={(e)=>{
                    if(query === "") return
                    setData((prev)=>[...prev,{answer:query}])
                    fetchData()
                    setQuery("")
                }}>submit</button>
            </div>
        </div>
    );
}

export default ChatBot;