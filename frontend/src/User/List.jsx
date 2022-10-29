import React, { useState } from 'react'
import { Link } from "react-router-dom"

import { DataGrid } from '@mui/x-data-grid'
import Alert from '@mui/material/Alert'
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material'

import {
  useUsers,
  useDeleteUser
} from '../UsersContext'


const AllUsers = () => {
  const [error, setError] = useState(false)

  const users = useUsers()

  return <>
    {!error &&
      <div style={{ height: '85vh', width: '600px', margin: 'auto' }
      }>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={100}
        // rowsPerPageOptions={[5]}
        />
      </div>
    }
    {error &&
      <Alert severity="error">Error loading data! Please reload page.</Alert>
    }
  </>
}


export default AllUsers


const DeleteButton = () => {
  const deleteUser = useDeleteUser()

  return <DeleteIcon
    style={{ cursor: 'pointer' }}
    onClick={deleteUser}
  />
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'role', headerName: 'Role', width: 100 },
  {
    field: "update",
    headerName: "Update",
    width: 100,
    renderCell: ({ row }) => <Link to={`/student/${row.id}`}><EditIcon /></Link>
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 100,
    renderCell: ({ row }) => <DeleteButton />
  }
]
