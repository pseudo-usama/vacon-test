import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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

import { useUsers, useUpdateUser } from '../UsersContext'

export default function Update() {
  const [user, setUser] = useState({ username: '', password: '', role: 'user' })
  const { username } = useParams()
  const updateUser = useUpdateUser()

  const users = useUsers()
  useEffect(() => {
    const user = users.find(user => user.username == username)
    if (user)
      setUser({
        username: user.username,
        password: user.password,
        role: user.role
      })
  }, [users])

  const handleSubmit = (e) => {
    e.preventDefault()

    updateUser(username, user)
      .then(() => window.alert('User has been updated'))
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
            Update
          </Button>
        </div>
      </form>
    </Container>
  </>
}