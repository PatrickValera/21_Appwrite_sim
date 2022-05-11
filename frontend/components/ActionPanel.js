import { Backdrop, Button, Paper, Slider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FlexBox from './utilcomps/FlexBox'
import api from '../api'
import { Query } from "appwrite";

const ActionPanel = ({ open, setOpen, stockId }) => {
    const [intent, setIntent] = useState(1)
    const [activeStock,setActiveStock] = useState(undefined)
    const handleAction = async (action) => {
        // Get Users Id
        const user = await api.account.get()
        // Fetch all assets of User
        let promise = api.database.listDocuments('asset', [
            Query.equal('ownerId', user.$id),
        ]);

        promise.then(function (response) {
            let exist = response.documents.find(x => x.stockId === activeStock.$id)
            // CREATE NEW ASSET DOC IF NOT EXIST`   1`-------------------------------------------------------------------+++++++++++++++++++++++++++`-
            if (!exist) {
                console.log('Creating new asset')
                api.database.createDocument('asset', 'unique()', {
                    ownerId: user.$id,
                    stockName: activeStock.name,
                    shares: intent,
                    averageCost: activeStock.currentPrice,
                    stockId: activeStock.$id
                })
            }
            // UPDATE IF ASSET EXIST
            else {
                console.log('Updating asset')
                let newShares
                if (action === 'sell') newShares = exist.shares - intent
                else newShares = exist.shares + intent
                if (newShares<=0)api.database.deleteDocument('asset', exist.$id)
                else api.database.updateDocument('asset', exist.$id, { shares: newShares })
            }
        }, function (error) {
            console.log(error)
        });
    }
    const fetchStockData=async()=>{
        console.log('fetching',stockId)
        let promise=api.database.getDocument('stock',stockId)
        promise.then(function(response){
            setActiveStock(response)
        })
    }
    useEffect(()=>{
        console.log(stockId)
        fetchStockData()
    },[stockId])
    return (
        <Backdrop open={open} onClick={() => setOpen(false)}>
            {activeStock && <Paper sx={{ p: 2, pointerEvents: 'all', minWidth: '300px' }} onClick={(e) => e.stopPropagation()}>
                <Typography variant='body2'>{activeStock.name}</Typography>
                <Typography variant='body2'>{activeStock.currentPrice}</Typography>
                <Typography variant='body2'>Intent: {intent}</Typography>
                <Slider aria-label="Volume" value={intent} min={1} max={10} onChange={(e) => setIntent(e.target.value)} />
                <FlexBox>
                    <Button onClick={()=>handleAction('sell')}>SELL</Button>
                    <Button onClick={()=>handleAction('buy')}>BUY</Button>
                </FlexBox>
            </Paper>}
        </Backdrop>
    )
}

export default ActionPanel