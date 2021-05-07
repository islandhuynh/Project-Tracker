import './App.css';

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ProjectSelect } from './components/ProjectSelect';

export const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (email: string, password: string) => {
    console.log(email, password);
  }

  return (
    <div className="login-container">
      <Form>
        <Form.Group controlId="formBasicEmail" onSubmit={() => login(email,password)}> 
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={() => login(email,password)}>Login</Button>
      </Form>
    </div>
  )
}


export const App = () => {
  const [authorized, setAuthorized] = useState(false);

  return (
    <div className="App">
      <div> 
        {!authorized ?
          <ProjectSelect />
          :
          <Auth />
        }
      </div>
    </div>
  );
}