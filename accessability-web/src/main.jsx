import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UsersTable from './users/users.table.jsx'
import UsersForm from './users/users.form.jsx'

import RolesTable from './roles/roles.table.jsx'
import RoleForm from './roles/roles.form.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    
    {/* <RolesTable /> */}

    <RoleForm/>

  </StrictMode>,
)
