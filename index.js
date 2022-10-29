require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const {
  getAllUsers,
  findUser,
  addUser,
  updateUser,
  deleteUser
} = require('./db')


const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())


// Only for admin
app.get('/all-users', signedIn, (req, res) => {
  getAllUsers()
    .then(users => res.status(200).json(users))
    .catch(() => res.status(500).send())
})

app.post('/user', signedIn, (req, res) => {
  const { username, password, role } = req.body

  addUser(username, password, role)
    .then(user => {
      res.status(200).send()
    })
    .catch(() => res.status(500).send())

  res.status(200).send()
})

app.patch('/user', signedIn, (req, res) => {
  const { oldUsername, updatedUser } = req.body
  updateUser(oldUsername, updatedUser)
    .then(() => {
      res.status(200).send()
    })
    .catch(() => res.status(500).send())
})

app.delete('/user/:username', signedIn, (req, res) => {
  const username = req.params.username
  deleteUser(username)
    .then(() => res.status(200).send())
    .catch(() => res.status(500).send())
})

// Login
app.post('/signin', (req, res) => {
  const { username, password } = req.body
  findUser(username, password)
    .then(user => {
      if (!user)
        return res.status(401).send('Invalid credentials')

      const token = getAccessToken(JSON.stringify(user))
      res.cookie('token', token, { httpOnly: false })
        .status(200)
        .send()
    })
    .catch(() => {
      res.status(500).send('Something bad happened at server. Try again')
    })
})

function signedIn(req, res, next) {
  const { token } = req.cookies
  if (!token)
    return res.status(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(401).send('authentication error')
    }
    req.user = user
    next()
  })
}

function getAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}

app.listen(5000, () => console.info('Server running'))

// DB connection
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err));
