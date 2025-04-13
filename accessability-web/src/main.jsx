import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersTable from './users/users.table';
import RolesTable from './roles/roles.table';
import OrganizationsTable from './organizations/OrganizationsTable.jsx';
import OrganizationForm from './organizations/OrganizationsForm.jsx';
import LocationTable from './locations/components/LocationTable';
import AccessibilityFeaturesTable from './accessibilityFeatures/accessibilityFeaturestable';
import UsersForm from './users/users.form';;
import LocationFormWrapper from './locations/components/LocationFormWrapper';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersTable />} />
        {/* <Route path={"/login"} element={<><Login/></>}/> */}
        <Route path="/users" element={<UsersTable />} />
        <Route path="/users/create" element={<UsersForm />} />
        <Route path="/users/:id" element={<UsersForm />} />
        <Route path="/roles" element={<RolesTable />} />
        <Route path="/organizations" element={<OrganizationsTable />} />

        <Route path={"/organizations/create"} element={<OrganizationForm />} />
      <Route path={"/organizations/:id"} element={<OrganizationForm />} />
      <Route path="/locations" element={<LocationTable />} />
        <Route path="/locations/create" element={<LocationFormWrapper />} />
        <Route path="/locations/update/:id" element={<LocationFormWrapper />} />

        <Route path="/accessibility-features" element={<AccessibilityFeaturesTable />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
