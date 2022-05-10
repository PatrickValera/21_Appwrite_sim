import { Button } from '@mui/material';
import React from 'react'
import api from '../api'
const Login = () => {
  const handleLogin = () => {
    let promise = api.account.createSession('admin@example.com', 'password');
    promise.then(function (response) {
      console.log(response); // Success
    }, function (error) {
      console.log(error); // Failure
    });

  }
  return (
    <Button onClick={handleLogin}>Login</Button>
  )
}

export default Login