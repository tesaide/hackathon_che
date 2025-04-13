import React from 'react';
import { useLocation } from 'react-router-dom';
import RoleForm from './RolesForm';

const RolesFormWrapper = () => {
    const locationData = useLocation();
    const { locations, isEditing } = locationData.state || {};

    return (
        <RoleForm
            locations={locations}
            isEditing={isEditing}
        />
    );
};

export default RolesFormWrapper;