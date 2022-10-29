import { useState, useEffect } from 'react'

import {
  TextField,
  Button,
  Container
} from '@mui/material'
import Alert from '@mui/material/Alert'


function User() {
  const [user, setUser] = useState({ name: '', role: '' })
  const [submissionError, setSubmissionError] = useState(undefined)

  const handleSubmit = (e) => {
    e.preventDefault()

    const encodedUrl = `name=${user.name}&role=${user.role}`
    fetch(process.env.REACT_APP_API_URL + '/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodedUrl,
    })
      .then(res => {
        if (res.status !== 201) {
          console.log(res)
          setSubmissionError(true)
          return
        }
        setSubmissionError(false)
        setUser({ name: '', role: '' })
      })
      .catch(err => {
        console.error(err)
        setSubmissionError(true)
      })
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
            value={user.name}
            onChange={e => setUser({ ...user, name: e.target.value })}
            id="filled-basic"
            label="Name"
            variant="outlined"
            required
          />
          <TextField
            value={user.role}
            onChange={e => setUser({ ...user, role: e.target.value })}
            id="filled-basic"
            label="Role"
            variant="outlined"
            required
            style={{ marginTop: 10 }}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ width: 100, margin: '10px 0 0 auto' }}
          >
            Submit
          </Button>
        </div>
      </form>

      {submissionError == true &&
        <Alert severity="error">Error submitting data! Please try again.</Alert>
      }
      {submissionError == false &&
        <Alert severity="success">Data submitted successfully.</Alert>
      }
    </Container>
  </>
}


export default User
