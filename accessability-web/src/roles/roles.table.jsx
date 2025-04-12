import React from 'react';
import { Space, Table, Tag } from 'antd';
import { rolesData } from './roles.data.js';



const columns = [
    {
        title: 'Id',
        dataIndex: 'id'
    },
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title: 'Description',
        dataIndex: 'description'
    },
    {
        title: 'Permissions',
        dataIndex: 'permissions'
    },
    {
        title: 'Create at',
        dataIndex: 'createdAt'
    },
    {
        title: 'Action',
        render: (_, record) => (
            <Space size="middle">
                <a href="#edit" onClick={(e) => handleEdit(e, record)}>Edit</a>
                <a href="#delete" onClick={(e) => handleDelete(e, record)}>Delete</a>
            </Space>
        ),
    },
];


const handleEdit = (e, record) => {
    e.preventDefault();
    console.log('Editing record:', record);
    // Your edit logic here (e.g., open a modal to edit the record)
};

const handleDelete = (e, record) => {
    e.preventDefault();
    console.log('Deleting record:', record);
    // Your delete logic here (e.g., open a confirmation modal)
};


const RolesTable = () => <Table columns={columns} dataSource={rolesData} />;
export default RolesTable;