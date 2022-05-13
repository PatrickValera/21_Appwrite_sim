import { Button, Fade, Paper, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
                <Stack direction='row' spacing={1} justifyContent='right' sx={{ my: 2 }}>
                    <Paper sx={{p:1}} elevation={3}>
                        <Button variant={activeContainer==='stocks'?'contained':'outlined'} onClick={() => setActiveContainer('stocks')}>Market</Button>
                        <Button variant={activeContainer==='assets'?'contained':'outlined'} onClick={() => setActiveContainer('assets')}>Investments</Button>
                    </Paper>

                </Stack>
                {activeContainer === 'stocks' ?
                    <StocksContainer stocks={stocks} setFocuseStock={setFocuseStock} /> :
                    <AssetsContainer />
                }
            </div>
        </Fade>
    )
}

export default MarketPanel