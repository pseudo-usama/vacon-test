import * as React from 'react';

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


function Profile() {
  const { name, role, avatar } = {
    name: 'Usama',
    role: 'Admin',
    avatar: 'https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png'
  }

  return <>
    <Container
      maxWidth="sm"
      style={{ textAlign: 'center' }}
      component={Paper}
    >
      <img
        style={{ maxWidth: 250, marginBottom: 40 }}
        src={avatar}
        alt="User image"
      />

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
              <TableCell align="center">{name}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center">Role:</TableCell>
              <TableCell align="center">{role}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">
                <Button variant="contained">Update</Button>
              </TableCell>

              <TableCell align="left">
                <Button variant="contained" color="error">Delete Profile</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  </>
}


export default Profile
