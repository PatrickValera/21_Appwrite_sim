import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import api from '../api'
import { useRouter } from 'next/router'

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [user, setUser] = useState()
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await api.account.createSession(email, password).then((response) => {
        console.log(response); // Success
        router.push('/')
      })
    } catch (e) {
      console.log(e); // Failure
      setError(e.message)
    }

  }
  const handleLogout = () => {
    api.account.deleteSession('current');
    setUser()
  }
  const fetchUser = async () => {
    try {
      let user = await api.account.get()
      console.log(user)
      setUser(user)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <Container maxWidth='sm'>
      {!user ? <Box component='form' onSubmit={handleLogin} noValidate sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant='h6' gutterBottom>Log In</Typography>
        <Typography variant='body2' color='error.main' gutterBottom>{error && error}</Typography>
        <TextField fullWidth name='email' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }}></TextField>
        <TextField type='password' fullWidth name='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }}></TextField>
        <Button type='submit' fullWidth variant='contained' sx={{ mb: 2 }}>Login</Button>
        <Button type='submit' fullWidth variant='outlined' href='/register' > No Account? Register</Button>
      </Box> : <Button onClick={(handleLogout)}>Logout</Button>}
    </Container>
  )
}

export default LoginPage