import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Container,
  Button,
  Paper
} from '@mui/material'
import { useUsers } from '../UsersContext'


function Profile() {
  // const avatar = 'https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png'
  const [user, setUser] = useState({ username: '', password: '', role: 'user', })
  const users = useUsers()

  useEffect(() => {
    const username = Cookies.get('username')
    const user = users.find(user => user.username == username)
    if (user)
      setUser({
        username: user.username,
        password: user.password,
        role: user.role
      })
  }, [users])

  return <>
    <Container
      maxWidth="sm"
      style={{ textAlign: 'center' }}
      component={Paper}
    >
      {/* <img
        style={{ maxWidth: 250, marginBottom: 40 }}
        src={avatar}
        alt="User image"
      /> */}

      <TableContainer>
        <Table
          sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none"
            }
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell align="center">Name:</TableCell>
              <TableCell align="center">{user.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Password:</TableCell>
              <TableCell align="center">{user.password}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Role:</TableCell>
              <TableCell align="center">{user.role}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="right">
                <Button variant="contained">
                  <Link
                    style={{ color: 'white', textDecoration: 'none' }}
                    to={`/update/${user.username}`}
                  >
                    Update
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  </>
}


export default Profile
