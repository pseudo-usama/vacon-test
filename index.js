const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())


// Only for admin
app.get('/all-users', (req, res) => {
  const users = [
    { username: 'usama', password: '123', role: 'admin' },
    { username: 'shah', password: '123', role: 'admin' },
    { username: 'fai', password: '123', role: 'admin' },
    { username: 'junaid', password: '123', role: 'admin' },
  ]
  res.status(200).json(users)
})
app.get('/user', (req, res) => {
  res.status(200).send()
})

app.post('/user', (req, res) => {
  const { username, password, role } = req.body
  res.status(200).send()
})

app.patch('/user', (req, res) => {
  const { oldUsername, updatedUser } = req.body
  console.log(oldUsername, updatedUser)
  res.status(200).send()
})

app.delete('/user:username', (req, res) => {
  const username = req.params.username
  res.status(200).send()
})

app.listen(5000, () => console.info('Server running'))
