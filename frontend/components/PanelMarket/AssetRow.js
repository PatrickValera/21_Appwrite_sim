import { Button, TableCell, TableRow } from '@mui/material'
import React from 'react'

const AssetRow = ({asset}) => {
  return (
    <TableRow hover>
      <TableCell sx={{ border: '0' }}>{asset.stockName}</TableCell>
      <TableCell align='right' sx={{ border: '0' }}>
        {asset.shares}
      </TableCell>
      <TableCell align='right' sx={{ border: '0' }}>
        ${asset.averageCost}
      </TableCell>
      <TableCell align='right' sx={{ border: '0' }}>
        <Button>...</Button>
      </TableCell>
    </TableRow>
  )
}

export default AssetRow
