import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FlexBox from './utilcomps/FlexBox'
import api from '../api'
import Link from 'next/link'

const Header = () => {
  const [user, setUser] = useState()

  const handleLogout = async () => {
    api.account.deleteSession('current')
  }

  const fetchUser = async () => {
    try {
      let user = await api.account.get()
      setUser(user)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <FlexBox sx={{ p: 1, width: '100%', bgcolor: 'background.paper', mb: 4, p: 2 }}>
      <Link href='/'>
        <Typography variant='h5' sx={{cursor:'pointer'}}>Mock Stock Platform</Typography>
      </Link>
      <FlexBox sx={{ justifyContent: 'right', flexGrow: '1' }}>
        {user ?
          <Button variant='contained' >{user.email}</Button> :
          <Link href='/userLogin' variant='contained'>Login</Link>
        }

      </FlexBox>
    </FlexBox>
  )
}

export default Header