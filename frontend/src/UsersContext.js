import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"
import axios from 'axios'


// Context's for user CRUD
const UsersContext = createContext()
const UpdateUserContext = createContext()
const AddUserContext = createContext()
const DeleteUserContext = createContext()

// Customs hooks for using created context's
export const useUsers = () => useContext(UsersContext)
export const useUpdateUser = () => useContext(UpdateUserContext)
export const useAddUser = () => useContext(AddUserContext)
export const useDeleteUser = () => useContext(DeleteUserContext)


export default function UserProvider({ children }) {
  const [users, setUsers] = useState([])

  // Getting all users from server
  useEffect(() => {
    axios.get('http://localhost:5000/all-users')
      .then(res => {
        setUsers(res.data.map((user, i) => ({ id: i + 1, ...user })))
      })
      .catch(() => window.alert('Error loading data from server. Please reload page'))
  }, [])

  const updateUser = (oldUsername, updatedUser) => {
    return new Promise((res, rej) => {
      axios.patch('http://localhost:5000/user', {
        oldUsername: oldUsername,
        updatedUser: updatedUser
      })
        .then(() => {
          const updatedUsers = [...users]
          const index = users.findIndex(user => user.username == oldUsername)
          updatedUsers[index] = { id: updatedUsers[index].id, ...updatedUser }
          setUsers(updatedUsers)
          res()
        })
        .catch(rej)
    })
  }
  const addUser = (user) => {
    return new Promise((res, rej) => {
      axios.post('http://localhost:5000/user', user)
        .then(() => {
          setUsers([...users, { id: users.length + 1, ...user }])
          res()
        })
        .catch(rej)
    })
  }
  const deleteUser = (username) => {
    axios.delete(`http://localhost:5000/user/${username}`)
      .then(() => {
        const newUsers = users.filter(user => user.username !== username)
        setUsers(newUsers)
      })
      .catch(() => {
        window.alert('Error deleting user. Try again')
      })
  }

  return <>
    <UsersContext.Provider value={users}>
      <UpdateUserContext.Provider value={updateUser}>
        <AddUserContext.Provider value={addUser}>
          <DeleteUserContext.Provider value={deleteUser}>
            {children}
          </DeleteUserContext.Provider>
        </AddUserContext.Provider>
      </UpdateUserContext.Provider>
    </UsersContext.Provider>
  </>
}
