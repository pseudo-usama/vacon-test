require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser
} = require('./db')


const app = express()

app.use(cors())
app.use(express.json())


// Only for admin
app.get('/all-users', (req, res) => {
  getAllUsers()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(() => {
      console.log('3280478758947')
    })
})
app.get('/user', (req, res) => {
  res.status(200).send()
})

app.post('/user', (req, res) => {
  const { username, password, role } = req.body

  addUser(username, password, role)
    .then(user => {
      res.status(200).send()
    })
    .catch(() => res.status(500).send())

  res.status(200).send()
})

app.patch('/user', (req, res) => {
  const { oldUsername, updatedUser } = req.body
  updateUser(oldUsername, updatedUser)
    .then(() => {
      res.status(200).send()
    })
    .catch(() => res.status(500).send())
})

app.delete('/user/:username', (req, res) => {
  const username = req.params.username
  deleteUser(username)
    .then(() => res.status(200).send())
    .catch(() => res.status(500).send())
})

app.listen(5000, () => console.info('Server running'))

// DB connection
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err));
