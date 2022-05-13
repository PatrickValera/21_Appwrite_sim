import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Query } from 'appwrite'
import React, { useEffect, useState } from 'react'
import api from '../../api'
import AssetRow from './AssetRow'

const AssetsContainer = () => {
  const [assetList,setAssetList]=useState()

  const fetchData = async () => {
    console.log('fetching Assets')
    try{
      const user=await api.account.get()
      const { documents } = await api.database.listDocuments('asset',[Query.equal('ownerId',user.$id)])
      console.log(documents)
      setAssetList(documents)
    }catch(e){
      console.log(e.message)
    }
  
  }
  useEffect(() => {
    if(!assetList)fetchData()
  }, [])
  return (
    <Box>

      <TableContainer sx={{ width: '100%' }}>
        <Table sx={{}}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '70%' }}>Ticker</TableCell>
              <TableCell align='right' sx={{}}>Shares</TableCell>
              <TableCell align='right' sx={{}}>Avg Price</TableCell>
              <TableCell align='right' sx={{}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {assetList&&assetList.map((asset,index) => (
              <AssetRow key={index} asset={asset}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AssetsContainer