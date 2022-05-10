import { Button } from '@mui/material';
import React from 'react'
import api from '../api'
const userRegister = () => {
  const handleRegister = () => {
    let promise = api.account.create('unique()', 'admin@example.com', 'password');
    promise.then(function (response) {
      console.log(response); // Success
    }, function (error) {
      console.log(error); // Failure
    });

  }
  return (
    <Button onClick={handleRegister}>userRegister</Button>
  )
}

export default userRegister