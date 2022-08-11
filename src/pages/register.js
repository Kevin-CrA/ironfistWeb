import React from 'react'
import { Form, Button } from "react-bootstrap";
import { useState, handleSubmit } from 'react';
import axios from "axios";

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");
    const [active, setActive] = useState("");
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        
        // set configurations
        const configuration = {
            method: "post",
            url: "https://ironfistdb.herokuapp.com/register",
            //url: "http://localhost:3003/register",
            data: {
                id,
                email,
                password,
                active
            },
        };
        // make the API call
        axios(configuration)
        .then((result) => {
            setRegister(true);
        })
        .catch((error) => {
            error = new Error();
        });

        
        // make a popup alert showing the "submitted" text for testing purposes:
        /*alert("Submited");*/

        e.preventDefault();
      }





      
    return (
        <>
    <h2>Register a new user</h2>
    <Form onSubmit={(e)=>handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>



        {/* id */}
        <Form.Group controlId="formBasicId">
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="id"
          />
        </Form.Group>
        
        {/* active */}


        <Form.Group controlId="formBasicActive">
            <Form.Label>Active?</Form.Label>
            <Form.Select aria-label="Default select example"       onChange={(e) => setActive(e.target.value)}>
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
            </Form.Select>
        </Form.Group>



        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </Button>

              {/* display success message */}
              {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Registered</p>
        )}
      </Form>
        </>
    )
}