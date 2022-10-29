import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
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
import req from "./req"

export default function Signin() {
  const [user, setUser] = useState({ username: '', password: '' })
  const navigate = useNavigate()

  const loggedIn = Boolean(Cookies.get('token'))
  useEffect(() => {
    if (loggedIn)
      navigate('/')
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    req.post('/signin', user)
      .then(res => navigate('/'))
      .catch(err => window.alert(err.response.data))
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

          <Button
            type="submit"
            variant="contained"
            style={{ width: 100, margin: '10px 0 0 auto' }}
          >
            Signin
          </Button>
        </div>
      </form>
    </Container>
  </>
}
