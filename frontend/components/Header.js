import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FlexBox from './utilcomps/FlexBox'
import api from '../api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RiStockLine } from 'react-icons/ri'
const Header = () => {
  const [user, setUser] = useState()
  const router = useRouter()

  const handleLogout = () => {
    api.account.deleteSession('current');
    setUser()
    router.push('/userlogin')
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
  }, [api])
  return (
    <FlexBox sx={{ p: {xs:1,md:2}, width: '100%', bgcolor: 'background.paper', mb: {xs:1,md:4},  }}>
      <FlexBox sx={{ justifyContent: 'left', flexGrow: '1' }}>
        <Link href='/'>
          <Typography variant='h5' sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}><RiStockLine size='2.2rem' style={{ color: 'green' }} />Mock Trade</Typography>
        </Link>
      </FlexBox>
      <FlexBox sx={{ justifyContent: 'center' }}>
        <Button href='/leaderboard'>LeaderBoard</Button>
        {user ?
          <Button onClick={handleLogout}>Logout</Button> :
          <Button href='/userlogin' variant='contained'>Login</Button>
        }

      </FlexBox>
    </FlexBox>
  )
}

export default Header