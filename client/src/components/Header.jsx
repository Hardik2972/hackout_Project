import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import avatar from '../user.png';
import { useState } from 'react';

function OffcanvasExample(props) {
  const [profile,setProfile] = useState({name:"" , contact:0 ,email:"" ,userImage:""});
  const [open, setOpen] = useState(false);
  async function changeOpen(){
    setOpen(!open);
    const userProfile= await props.getProfile();
    setProfile({name:userProfile[0].username , contact:userProfile[0].contact , email:userProfile[0].email ,userImage:userProfile[0].userImage});
  }
function handleChange(event) {
  const { name, value } = event.target;
  setProfile(prevProfile => {
    return {
    ...prevProfile,
    [name]: value
    };
  });
  }
function handleSubmit(){
  props.upDate(profile);
}
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" sticky="top" style={{width:"100%"}}>
        <Container>
          <Navbar.Brand>Narekshak</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" >
            <Nav className="me-auto">
              <Nav.Link href="#features">Blog</Nav.Link>
              <Nav.Link href="#pricing">Help</Nav.Link>
              <Nav.Link href="#pricing">About</Nav.Link>
              <Nav.Link href="#pricing">Contact</Nav.Link>
            </Nav>
            <>
              <Button onClick={props.logout} style={{maxHeight:"50px" , marginRight:"10px"}}>Log Out</Button>
              <Button
                  onClick={() => changeOpen()}
                >
                  Profile
              </Button>
            </>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {
        open? 
        <div className='prompt' style={{display:"flex" ,flexDirection:"column" ,minWidth:"50%" }}>
          <h1 style={{textAlign:"center"}}>PROFILE</h1>
          <img src= {profile.userImage === ""? avatar : profile.userImage} style={{alignSelf:"center",width:"150px" ,height:"150px" ,borderRadius:"50%"}} />
          <div>
          <hr />
            <p>NAME:</p>
            <input value={profile.name} onChange={(e) => handleChange(e)} name="name"/>
          <hr />
          <p>EMAIL:</p>
            <p>{profile.email}</p>
          <hr />
          <p>CONTACT:</p>
            <input value={profile.contact} onChange={(e) => handleChange(e)} name="contact"/>
          </div>
          <hr />
          <button onClick={handleSubmit}>Update</button>
        </div> : <></>
      }
  </>
  );
}

export default OffcanvasExample;