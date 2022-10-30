const { getAllUsers, addUser } = require('./db')


function createSuperAdmin() {
  getAllUsers()
    .then(allUsers => {
      const superAdmin = allUsers.find(user => user.username == 'admin' && user.password == 'admin')

      if (!superAdmin) {
        addUser('admin', 'admin', 'admin')
          .then(() => { })
          .catch(() => { })
      }
    })
    .catch(() => { })
}


module.exports = {
  createSuperAdmin
}
