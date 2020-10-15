import React, {useState} from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { BrowserRouter, Route, Link } from "react-router-dom";

export default function LoginForm() {
    const [input, setInput]= useState({
        email: "",
        password: ""
    })

   function handleChange(event){
       event.prevendDefault();
       setInput(event.target.value);
   }

    return (
        <Jumbotron fluid>
<Container>

     <Form>
            
  
          
          <Col as={Row} sm={{ span: 5, offset: 5 }}>
            <label  size="lg" controlId="formBasicEmail" >Email</label>
            </Col>
          <Col as={Row} sm={{ span: 5, offset: 5 }}>
             <input  
             type="email" 
             placeholder="Enter email" 
             name="email" 
             onChange={handleChange} 
             value={input.email} 
             />
             </Col>
             <br />
            <Col  sm={{ span: 5, offset: 5 }}>
               <label  size="lg" as={Row} controlId="formHorizontalPassword" >Password</label></Col>
            <Col as={Row} sm={{ span: 5, offset: 5 }}>
               <input 
               type="password" 
               placeholder="Enter password" 
               name="password" 
               onChange={handleChange} 
               value={input.password} />
               </Col>
               <br />
            <Col as={Row} sm={{ span: 5, offset: 5 }}>
              <Link to = "/Skills">< button type="button" variant="secondary" size="lg" p-2 active >Login</button></Link>
              </Col>
            <Col as={Row} sm={{ span: 5, offset: 5 }}>
               <Link to="/signup">signup</Link> 
               </Col>
        </Form>    


</Container>
</Jumbotron>

    )
}