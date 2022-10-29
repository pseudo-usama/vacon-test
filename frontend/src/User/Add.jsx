import React, { useState } from 'react'

import {
  TextField,
  Button,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'

import { useAddUser } from '../UsersContext'

function Add() {
  const [user, setUser] = useState({ username: '', password: '', role: 'user' })
  const addUser = useAddUser()

  const handleSubmit = (e) => {
    e.preventDefault()
    addUser(user)
      .then(() => {
        setUser({ username: '', password: '', role: 'user' })
        window.alert('User has been added')
      })
      .catch(() => window.alert('Some error occurred. Try again'))
  }

  return <>
    <Container>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          flexFlow: 'column',
          width: 350,
        }}>
          <TextField
            value={user.username}
            onChange={e => setUser({ ...user, username: e.target.value })}
            id="filled-basic"
            label="Username/Name"
            variant="outlined"
            required
          />
          <TextField
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
            id="filled-basic"
            label="Password"
            variant="outlined"
            required
            style={{ marginTop: 10 }}
          />

          <FormControl style={{ marginTop: 20 }}>
            <FormLabel id="demo-radio-buttons-group-label">Role:</FormLabel>
            <RadioGroup
              onChange={e => setUser({ ...user, role: e.target.value })}
              value={user.role}
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              row
              required
            >
              <FormControlLabel value="user" control={<Radio />} label="User" />
              <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            style={{ width: 100, margin: '10px 0 0 auto' }}
          >
            Submit
          </Button>
        </div>
      </form>
    </Container>
  </>
}


export default Add
