import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react"


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

  useEffect(() => {
    setUsers([
      { id: 1, name: 'usama', role: 'admin' },
      { id: 2, name: 'usama', role: 'admin' },
      { id: 3, name: 'usama', role: 'admin' },
      { id: 4, name: 'usama', role: 'admin' },
    ])
  }, [])

  const updateUser = () => {
    console.log('updateing user')
  }
  const addUser = () => {
    console.log('adding user')
  }
  const deleteUser = () => {
    console.log('deleting user')
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
