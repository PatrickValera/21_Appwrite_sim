import { Container, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../api'
import Header from '../components/Header'
const LeaderBoard = () => {
  const [userList, setUserList] = useState()
  const fetchUsers = async () => {
    await api.database.listDocuments('userInfo').then(res => {
      console.log(res.documents)
      let ar = res.documents
      ar.sort((a, b) => {
        return b.netWorth - a.netWorth
      })
      setUserList(ar)
    })
  }
  useEffect(() => {
    fetchUsers()
  }, [])
  return (
    <>
    <Header/>
    <Container maxWidth='md' sx={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant='h4' gutterBottom>Top 10 Richest</Typography>
      <TableContainer sx={{ width: '100%' }}>
        <Table sx={{}}>
          <TableHead>
            <TableRow >
              <TableCell align='center' sx={{ width: '10%' }}>Rank</TableCell>
              <TableCell sx={{ width: '30%' }}>Name</TableCell>
              <TableCell sx={{ width: '10%' }}>Net Worth</TableCell>

            </TableRow>
          </TableHead>
          <TableBody >
            {userList && userList.map((user, index) =>
              <TableRow key={index} hover sx={{ fontWeight: `${[0, 1, 2].includes(index) ? '600' : '400'}`, color: `${index === 0 ? 'gold' : index === 1 ? 'orange' : index === 2 && 'lightblue'}` }}>
                <TableCell align='center' sx={{ fontWeight: 'inherit', border: '1', color: 'inherit' }}> #{index + 1}</TableCell>
                <TableCell sx={{ fontWeight: 'inherit', border: '1', color: 'inherit' }}> {user.name}</TableCell>
                <TableCell sx={{ fontWeight: 'inherit', border: '1', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                  $<Typography fontSize='2rem !important'>{Number(user.netWorth.toFixed(0)).toLocaleString("en-US")}</Typography>
                </TableCell>
              </TableRow>
            )}
            {!userList && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => (
              <TableRow key={index} hover>
                <TableCell colSpan={2} sx={{ border: '1' }}> <Skeleton variant="rectangular" sx={{ width: '100%' }} height={40} /></TableCell>
              </TableRow>
            ))}


          </TableBody>

        </Table>
      </TableContainer>
    </Container>
    </>
  )
}

export default LeaderBoard