import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import avatar from '../user.png';
import { useState } from 'react';

function OffcanvasExample(props) {
  
  return (
    <Navbar expand="lg"  id="top" className="bg-body-tertiary" sticky="top" style={{width:"100%"}}>
      <Container>
        <Navbar.Brand>DreamBlog</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto">
            <Nav.Link href="/secret">Blogs</Nav.Link>
          </Nav>
          <>
            <Button href="/index2.html" style={{maxHeight:"50px" , marginRight:"10px"}}>Feedback</Button>
            <Button onClick={props.logout} style={{maxHeight:"50px" , marginRight:"10px"}}>Log Out</Button>
            <Button
                href="/profile"
              >
                Profile
            </Button>
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;