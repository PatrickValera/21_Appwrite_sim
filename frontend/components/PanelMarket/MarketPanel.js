import { Button, Fade, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FlexBox from '../utilcomps/FlexBox'
import AssetsContainer from './AssetsContainer'
import StocksContainer from './StocksContainer'

const MarketPanel = ({ setFocuseStock, stocks }) => {
    const [activeContainer, setActiveContainer] = useState('stocks')
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(true)
        return (() => setOpen(false))
    }, [])
    return (
        <Fade in={open}>
            <div>
                <FlexBox sx={{alignItems:'center',py:2,flexWrap:'noWrap'}}>
                    {activeContainer==='stocks'?
                    <Typography sx={{fontSize:{xs:'1.5rem',md:'2.5rem'},flex:'auto 1 1'}} variant='h4'>The Market</Typography>:
                    <Typography sx={{fontSize:{xs:'1.5rem',md:'2.5rem'},flex:'auto 1 1'}} variant='h4'>Your Assets</Typography>
                }
                        <Paper sx={{ p: 1,flexDirection:'column',display:'flex' }} elevation={3}>
                            <Button size='small' variant={activeContainer === 'stocks' ? 'contained' : 'outlined'} onClick={() => setActiveContainer('stocks')}>Market</Button>
                            <Button size='small' variant={activeContainer === 'assets' ? 'contained' : 'outlined'} onClick={() => setActiveContainer('assets')}>Assets</Button>
                        </Paper>
                </FlexBox>
                {activeContainer === 'stocks' ?
                    <StocksContainer stocks={stocks} setFocuseStock={setFocuseStock} /> :
                    <AssetsContainer />
                }
            </div>
        </Fade>
    )
}

export default MarketPanel