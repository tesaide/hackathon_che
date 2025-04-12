import React from 'react';
import { Space, Table } from 'antd';
import { rolesData } from './roles.data.js';
import {MainLayout} from "../common/layout/MainLayout.jsx";
import {Link} from "react-router-dom";



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
                <Link to="#edit" onClick={(e) => handleEdit(e, record)}>Edit</Link>
                <Link to="#delete" onClick={(e) => handleDelete(e, record)}>Delete</Link>
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


const RolesTable = () => <MainLayout><Table columns={columns} dataSource={rolesData} /></MainLayout>;
export default RolesTable;