import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../api'
import { useRouter } from 'next/router'

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [user, setUser] = useState()
  const router = useRouter()


  const handleRegister = async (e) => {
    e.preventDefault()
    await api.account.create('unique()', email, password, name)
      .then(async (response) => {
        api.account.createSession(email, password).then((response) => {
          console.log('response')

          api.database.createDocument('userInfo', 'unique()', {
            cash: 20000,
            userId: response.userId,
            name:name,
            netWorth: 20000
          }).then(res => console.log("CREATED USER INFO"))

        })
        router.push('/')
      }, (error) => {
        setError(error.message)
        console.log(error)
      })

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
      {!user && <Box component='form' onSubmit={handleRegister} noValidate sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant='h6' gutterBottom>Register</Typography>
        <Typography variant='body2' color='error.main' gutterBottom>{error && error}</Typography>
        <TextField fullWidth name='name' label='Name' value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }}></TextField>
        <TextField fullWidth name='email' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }}></TextField>
        <TextField type='password' fullWidth name='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }}></TextField>
        <Button type='submit' fullWidth variant='contained' sx={{ mb: 2 }}>Register</Button>
        <Button type='submit' fullWidth variant='outlined' href='/userlogin' > Have an Account? Login</Button>
      </Box>}
    </Container>
  )
}

export default RegisterPage