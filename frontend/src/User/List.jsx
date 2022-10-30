import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'
import { DataGrid } from '@mui/x-data-grid'
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material'

import {
  useUsers,
  useDeleteUser
} from '../UsersContext'


export default function AllUsers() {
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const users = useUsers()

  if (Cookies.get('role') == 'user')
    navigate('/profile')


  return <>
    <div style={{ height: '85vh', width: '750px', margin: 'auto' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={100}
      // rowsPerPageOptions={[5]}
      />
    </div>
  </>
}

const DeleteButton = ({ username }) => {
  const deleteUser = useDeleteUser()

  return <DeleteIcon
    style={{ cursor: 'pointer' }}
    onClick={() => deleteUser(username)}
  />
}

const columns = [
  { field: 'id', headerName: 'No.', width: 70 },
  { field: 'username', headerName: 'Username', width: 200 },
  { field: 'password', headerName: 'Password', width: 200 },
  { field: 'role', headerName: 'Role', width: 100 },
  {
    field: "update",
    headerName: "Update",
    width: 100,
    renderCell: ({ row }) => <Link to={`/update/${row.username}`}><EditIcon /></Link>
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 100,
    renderCell: ({ row }) => <DeleteButton username={row.username} />
  }
]
