import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersTable from './users/users.table';
import UsersForm from './users/users.form';
import RolesTable from './roles/RolesTable.jsx';
import OrganizationsTable from './organizations/OrganizationsTable.jsx';
import OrganizationsForm from './organizations/OrganizationsForm';
import LocationTable from './locations/components/LocationTable';
import AccessibilityFeaturesTable from './accessibilityFeatures/AccessibilityFeaturesTable';
import LocationFormWrapper from './locations/components/LocationFormWrapper';
import RolesFormWrapper from './roles/RolesFormWrapper.jsx';
import Login from './common/login/login';
import AccessibilityFeaturesForm from './accessibilityFeatures/AccessibilityFeaturesForm';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersTable />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/users/create" element={<UsersForm />} />
        <Route path="/users/:id" element={<UsersForm />} />
        
        <Route path="/roles" element={<RolesTable />} />
        <Route path="/roles/create" element={<RolesFormWrapper />} />
        <Route path="/roles/update/:id" element={<RolesFormWrapper />} />

        <Route path="/organizations" element={<OrganizationsTable />} />
        <Route path={"/organizations/create"} element={<OrganizationsForm />} />
        <Route path={"/organizations/:id"} element={<OrganizationsForm />} />
        <Route path="/locations" element={<LocationTable />} />
        <Route path="/locations/create" element={<LocationFormWrapper />} />
        <Route path="/locations/update/:id" element={<LocationFormWrapper />} />

        <Route path="/accessibility-features" element={<AccessibilityFeaturesTable />} />
        <Route path="/accessibility-features/create" element={<AccessibilityFeaturesForm />} />
        <Route path="/accessibility-features/:id" element={<AccessibilityFeaturesForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
