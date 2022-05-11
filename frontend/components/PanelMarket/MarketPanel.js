import { Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import AssetsContainer from './AssetsContainer'
import StocksContainer from './StocksContainer'

const MarketPanel = ({ setFocuseStock, stocks }) => {
    const [activeContainer, setActiveContainer] = useState('stocks')
    return (
        <>
            <Stack direction='row' spacing={1} justifyContent='center' sx={{my:2}}>
                <Button variant='contained' onClick={() => setActiveContainer('stocks')}>Market</Button>
                <Button variant='contained' onClick={() => setActiveContainer('assets')}>Investments</Button>
            </Stack>
            {activeContainer === 'stocks' ?
                <StocksContainer stocks={stocks} setFocuseStock={setFocuseStock} /> :
                <AssetsContainer />
            }
        </>
    )
}

export default MarketPanel