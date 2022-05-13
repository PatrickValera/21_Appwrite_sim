import { Avatar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FlexBox from './utilcomps/FlexBox'
import api from '../api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RiStockLine } from 'react-icons/ri'
const Header = () => {
  const [user, setUser] = useState()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const fetchUser = async () => {
    try {
      let user = await api.account.get()
      setUser(user)
    } catch (e) {
      console.log(e)
    }
  }
  const handleLogout = () => {
    api.account.deleteSession('current');
    setUser()
    router.push('/login')
  }
  useEffect(() => {
    fetchUser()
  }, [api])
  return (
    <FlexBox sx={{ p: { xs: 1, md: 2 }, width: '100%', bgcolor: 'background.paper', mb: { xs: 1, md: 4 }, }}>
      <FlexBox sx={{ justifyContent: 'left', flexGrow: '1' }}>
        <Link href='/'>
          <Typography variant='h5' sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}><RiStockLine size='2.2rem' style={{ color: 'green' }} />Mock Trade</Typography>
        </Link>
      </FlexBox>
      <FlexBox sx={{ justifyContent: 'center' }}>
        <Button href='/leaderboard'>LeaderBoard</Button>
        {!user ?
          <Button href='/login' variant='contained'>Login</Button> :
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,

              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>
                Profile
              </MenuItem>
              <MenuItem>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>

            </Menu>
          </>
        }

      </FlexBox>
    </FlexBox>
  )
}

export default Header