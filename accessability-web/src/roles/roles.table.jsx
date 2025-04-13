import React, { useReducer } from 'react';
import { Space, Table, Button } from 'antd'; // Додано імпорт Button
import { Link } from 'react-router-dom';
import { rolesData as initialRolesData } from './roles.data.js'; // Перейменуємо для уникнення плутанини
import { MainLayout } from '../common/layout/MainLayout.jsx';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; // Додано імпорт іконок

export const actionTypes = {
    ADD_ROLE: 'ADD_ROLE',
    UPDATE_ROLE: 'UPDATE_ROLE',
    DELETE_ROLE: 'DELETE_ROLE',
    SET_ROLES: 'SET_ROLES'
};

const rolesReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ADD_ROLE:
            return [...state, action.payload];
        case actionTypes.UPDATE_ROLE:
            return state.map((item) =>
                item.id === action.payload.id ? { ...item, ...action.payload } : item
            );
        case actionTypes.DELETE_ROLE:
            return state.filter((item) => item.id !== action.payload);
        case actionTypes.SET_ROLES:
            return action.payload;
        default:
            return state;
    }
};

const RolesTable = () => {
    const [roles, dispatch] = useReducer(rolesReducer, initialRolesData);

    const handleEdit = (e, record) => {
        e.preventDefault();
        console.log('Editing record:', record);
        // Ваша логіка редагування тут (наприклад, відкриття модального вікна)
    };

    const handleDeleteRole = (e, record) => {
        e.preventDefault();
        console.log('Deleting record:', record);
        dispatch({ type: actionTypes.DELETE_ROLE, payload: record.id });
        // Тут ви також можете викликати ваш API для видалення ролі
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Permissions',
            dataIndex: 'permissions',
        },
        {
            title: 'Create at',
            dataIndex: 'createdAt',
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        type="primary"
                        onClick={(e) => handleEdit(e, record)}
                    >
                        {/* Можна залишити текст, якщо потрібна підказка */}
                    </Button>
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={(e) => handleDeleteRole(e, record)}
                    >
                        {/* Можна залишити текст, якщо потрібна підказка */}
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <MainLayout>
            <Table rowKey="id" columns={columns} dataSource={roles} />
        </MainLayout>
    );
};

export default RolesTable;
