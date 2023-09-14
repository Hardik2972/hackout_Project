import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
//import MapView from './Map/Map';
import {Map , Marker , Popup, TileLayer ,MapContainer, useMap} from 'react-leaflet'
//import L from 'leaflet';
import icon from "./Map/constants";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

/*
function GridBasicExample() {
    /*
    <Container>
       <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Select time of incident
                </Form.Label>
                <Col sm={5}>
                <Form.Control type="time" className='mx-2' />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Col sm={7}>
                 <Form.Control as="textarea" rows={3} placeholder='enter your description'/>
                </Col>
            </Form.Group>
            <Col sm={7} className="mb-3">
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Col>
            <Col sm={7} className="mb-3">
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Col>
            <Col sm={7}>
                <InputGroup className="mb-3">
                    <Form.Control
                    accept=".jpeg, .png, .jpeg"
                    type="file"
                    name="MyFile"
                    />
                </InputGroup>
            </Col>
            <Button variant="primary" type="submit" className="mb-3">
                Submit
            </Button>
        </Form>
        <Col>
          <MapView />
        </Col>
    </Container>
    
    let lat,lng;
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition(position=>{
      const {latitude , longitude} = position.coords;
      var element1 = document.getElementById("lat");
      var element2 = document.getElementById("lng");
      element1.setAttribute("value",latitude);
      element2.setAttribute("value",longitude);
      console.log(document.getElementById('map'))
      var map = L.map('map').setView([ latitude, longitude], 13);
  
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
  
      var changedPos;
      var marker = L.marker([latitude, longitude],{draggable:true}).addTo(map).bindPopup('Latlng(' + latitude+ ',' + " "+longitude + ')').openPopup();
      marker.on("dragend",function(e){
        changedPos = e.target.getLatLng();
        const position = () =>{
          var element1 = document.getElementById("lat");
          var element2 = document.getElementById("lng");
          element1.setAttribute("value",changedPos.lat);
          element2.setAttribute("value",changedPos.lng);
        };
        this.bindPopup(changedPos.toString()).openPopup();
      });
    })
     return(
      <>
      <h1 style={{textAlign: "center"}}>REPORT ISSUE</h1> 
      <form className="Form" action="http://localhost:8080/api/report" method="post">
        
        <div id="first">
          <div className="components">
            <label htmlFor="appt" >Select a time:  </label>
            <input type="time" id="appt" name="time" />
          </div>
          <div className="components">
            <textarea name="text" id="text" cols="30" style={{flexGrow: "1"}}></textarea>
          </div>
          <div className="components">
            <select className="dropdown" name="ComplaintCases">
              <option value="volvo">select your complaint</option>
              <option value="Lighting issues">Lighting issues</option>
              <option value="Safety Concerns">Safety Concerns</option>
              <option value="Violence Report">Violence Report</option>
              <option value="miscellaneous">Harashment, Stocking, Abusement and Molestation Cases</option>
            </select>
          </div>
          <div className="components">
            <select className="dropdown" name="ComplaintCases">
              <option value="volvo">select your complaint seriousness</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <input value="123" name="latitude" id="lat" style={{display: "none"}}></input>
          <input value="456" name="longitude" id="lng" style={{display: "none"}}></input>
          <div className="components">
            <button style={{width: "100%"}} type='submit'>Report</button>
          </div>
          <input
            type="file" 
            label="Image"
            name="MyFile"
            id="file-upload"
            accept=".jpeg, .png, .jpeg"
            placeholder="upload"
          />
        </div>
        <div id="map"></div>
      </form>  
      </>
    
    const [details,setDetails]= useState({
        time:"",
        desc:"",
        problem:"",
        seriousness:"",
        position:null,
        file:""
    })

    function handleChange(event) {
        console.log(formD);
        const { name, value } = event.target;
    
    setForm(prevForm => {
        return {
        ...prevForm,
        [name]: value
        };
    });
    }

    async function handleFileUpload(e){
		const file= e.target.files[0];
		const base64= await convertToBase64(file);
		console.log("uploaded");
		setForm({...formD, MyFile: base64});
	}

    function FormView(){
        return(
            <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Select time of incident
                </Form.Label>
                <Col sm={5}>
                <Form.Control type="time" className='mx-2' name="time" value={details.time} onchange={handleChange} />
                </Col>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Col sm={7}>
                 <Form.Control as="textarea" rows={3} placeholder='enter your description'  name="time" value={details.time} onchange={handleChange}/>
                </Col>
            </Form.Group>
            <Col sm={7} className="mb-3">
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Col>
            <Col sm={7} className="mb-3">
                <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Col>
            <Col sm={7}>
                <InputGroup className="mb-3">
                    <Form.Control
                    accept=".jpeg, .png, .jpeg"
                    type="file"
                    name="MyFile"
                    />
                </InputGroup>
            </Col>
            <Button variant="primary" type="submit" className="mb-3">
                Submit
            </Button>
            </Form>
        );
    }

    function LocationMarker() {
        //const [position, setPosition] = useState(null);
        const [bbox, setBbox] = useState([]);
        const markerRef = useRef(null)
        const map = useMap();
    
        useEffect(() => {
          map.locate().on("locationfound", function (e) {
            setDetails(prev=>{
                return{
                    ...prev,
                    "position":e.latlng
                };
            });
            map.flyTo(e.latlng, map.getZoom());
            setBbox(e.bounds.toBBoxString().split(","));
          });
        }, [map]);
    
        return position === null ? null : (

          <Marker position={position} icon={icon} draggable={true} ref={markerRef} eventHandlers={{
            dragend() {
              const marker = markerRef.current
              if (marker != null) {
                setPosition(marker.getLatLng())
              }
              console.log(position)
            },
          }}
    >
            <Popup>
              You are here. <br />
              Map bbox: <br />
              <b>Southwest lng</b>: {bbox[0]} <br />
              <b>Southwest lat</b>: {bbox[1]} <br />
              <b>Northeast lng</b>: {bbox[2]} <br />
              <b>Northeast lat</b>: {bbox[3]}
            </Popup>
          </Marker>
        );
      }
    
      return (
        <Container>
            <FormView />
            <Col sm={7}>
                <MapContainer
                center={[49.1951, 16.6068]}
                zoom={19}
                scrollWheelZoom
                style={{ height: "100vh" }}
                >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                </MapContainer>
            </Col>
        </Container>
      );

}

export default GridBasicExample;

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
*/






export default function App() {
  const [formD,setForm]= useState({
    time:"",
    desc:"",
    problem:"",
    seriousness:"",
    latitude:null,
    longitude:null,
    file:""
  })
  const navigate = useNavigate();
  const [check,setCheck]= useState(0)

  function handleChange(event) {
    event.preventDefault();
    console.log(formD);
    const { name, value } = event.target;
  
    setForm(prevForm => {
      return {
      ...prevForm,
      [name]: value
      };
    });
  }
  
  async function handleFileUpload(e){
  const file= e.target.files[0];
  const base64= await convertToBase64(file);
  console.log("uploaded");
  setForm({...formD, file: base64});
  setCheck(1)
  }

  async function submitReport(event) {
    event.preventDefault();
    const response= await fetch("http://localhost:8080/api/report",{
      method: "POST",
      body: JSON.stringify({data:formD, customToken:localStorage.getItem("customToken")}) ,
      headers:{
        "Content-Type": "application/json",
      }
     })
    const res= await response.json();
    console.log(res);
    setForm({
      time:"",
      desc:"",
      problem:"",
      seriousness:"",
      latitude:null,
      longitude:null,
      file:""
    });
  }

  function addPos(data){
    console.log(data)
    setForm({...formD,latitude:data.lat,longitude:data.lng});
  }

  function FormView(){
    return(
      <Container >
         <Form>
              <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                  Select time of incident
                  </Form.Label>
                  <Col sm={5}>
                  <Form.Control type="time" className='mx-2' name="time" value={formD.time} onChange={handleChange}  />
                  </Col>
              </Form.Group>
              <Form.Group className="mb-3" >
                  <Col sm={7}>
                   <Form.Control as="textarea" rows={3} placeholder='enter your description' name="desc" value={formD.desc} onChange={handleChange}/>
                  </Col>
              </Form.Group>
              <Col sm={7} className="mb-3">
                  <Form.Select aria-label="Default select example" name="problem"  onChange={handleChange} value={formD.problem}>
                      <option>select your complaint</option>
                      <option value="1">Lighting issues</option>
                      <option value="2">Safety Concerns</option>
                      <option value="3">Violence Report</option>
                      <option vavlue="4">Harashment, Stocking, Abusement and Molestation Cases</option>
                  </Form.Select>
              </Col>
              <Col sm={7} className="mb-3">
                  <Form.Select aria-label="Default select example" name="seriousness" onChange={handleChange} value={formD.seriousness}>
                      <option>select your complaint seriousness</option>
                      <option value="1">High</option>
                      <option value="2">Medium</option>
                      <option value="3">Low</option>
                  </Form.Select>
              </Col>
              <Col sm={7}>
                  <InputGroup className="mb-3">
                      <Form.Control
                      accept=".jpeg, .png, .jpeg"
                      type="file"
                      name="MyFile"
                      onChange={(e) => handleFileUpload(e)}
                      />
                  </InputGroup>
                  <div>{check?"uploaded":"upload image"}</div>
              </Col>
              <Button variant="primary" type="submit" className="mb-3" onClick={submitReport}>
                  Submit
              </Button>
          </Form>
      </Container>
    );
  }

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
    const markerRef = useRef(null)
    const map = useMap();

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map]);

    return position === null ? null : (
      <Marker position={position} icon={icon} ref={markerRef} draggable={true} eventHandlers={{
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
          console.log(position)
        },
      }}>
        <Popup>
          You are here. <br />
          Map bbox: <br />
          <b>Southwest lng</b>: {bbox[0]} <br />
          <b>Southwest lat</b>: {bbox[1]} <br />
          <b>Northeast lng</b>: {bbox[2]} <br />
          <b>Northeast lat</b>: {bbox[3]}
        </Popup>
      </Marker>
    );
  }

  return (
    <Container>
      <Col className='mb-5'>
          <MapContainer
          center={[28.7041, 77.1025]}
          zoom={19}
          scrollWheelZoom
          style={{ height: "60vh"}}
          >
          <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          </MapContainer>
      </Col>
      <div style={{display:"flex",marginLeft:"30%"}}>
        <FormView />
      </div>
      </Container>
  );
}

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