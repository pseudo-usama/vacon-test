const User = require('./models/User')


// For getting all users
function getAllUsers() {
  return new Promise(async (res, rej) => {
    try {
      let users = await User.find({})
      res(users)
    }
    catch (err) {
      console.error(err)
      rej()
    }
  })
}

// For Adding user
function addUser(username, password, role) {
  return new Promise(async (res, rej) => {
    try {
      const user = new User({
        username: username,
        password: password,
        role: role
      })
      const newUser = await user.save()
      res(newUser)
    }
    catch (err) {
      console.error(err)
      rej()
    }
  })
}

function updateUser(oldUsername, updatedUser) {
  return new Promise(async (res, rej) => {
    try {
      const user = await User.findOneAndUpdate({ username: oldUsername }, updatedUser)
      res()
    }
    catch (err) {
      console.error(err)
      rej()
    }
  })
}

function deleteUser(username) {
  return new Promise(async (res, rej) => {
    try {
      const user = await User.deleteOne({ username: username })
      if (user.deletedCount == 0)
        throw "Data not found"
      res()
    }
    catch (err) {
      console.error(err)
      rej()
    }
  })
}


module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser
}
