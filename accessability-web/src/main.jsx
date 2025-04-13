import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersTable from './users/users.table';
import UsersForm from './users/users.form';
import RolesTable from './roles/roles.table';
import OrganizationsTable from './organizations/OrganizationsTable';
import OrganizationForm from './organizations/OrganizationsForm';
import LocationTable from './locations/components/LocationTable';
import AccessibilityFeaturesTable from './accessibilityFeatures/AccessibilityFeaturesTable';
import LocationFormWrapper from './locations/components/LocationFormWrapper';
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
        <Route path="/organizations" element={<OrganizationsTable />} />

        <Route path="/organizations/create" element={<OrganizationForm />} />
        <Route path="/organizations/:id" element={<OrganizationForm />} />
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
