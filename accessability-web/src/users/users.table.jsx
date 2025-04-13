import React, { useState } from 'react';
import {
  Table,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { users } from './users.data';
import { MainLayout } from '../common/layout/MainLayout';
import { TableActions } from '../common/TableActions';
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';
import { CreateEntityBtn } from '../common/CreateEntityBtn';

// const { Search } = Input;

function UsersTable() {
  const [deleteUserId, setDeleteUserId] = useState(null);
  const navigate = useNavigate();
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'ПІБ',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
    },

    {
      title: 'Статус',
      dataIndex: 'verificationStatus',
      render: (status) => (status ? '✅' : '❌'),
    },
    {
      title: 'Час створення',
      dataIndex: 'createdAt',
    },
    {
      title: '',
      render: (text, record) => <TableActions record={record} handleEdit={(id) => navigate(`/users/${id}`)} handleDelete={(id) => setDeleteUserId(id)} />,
    },
  ];

  return (
    <MainLayout>
      {/* <Search */}
      {/*  placeholder="Search by name or email" */}
      {/*  onSearch={handleSearch} */}
      {/*  onClear={getStandart} */}
      {/*  style={{ marginBottom: 16, width: 300 }} */}
      {/*  allowClear */}
      {/* /> */}
      <CreateEntityBtn redirectTo="/users/create" />
      <Table size="middle" columns={columns} dataSource={users} />
      <ConfirmDeleteModal open={!!deleteUserId} onConfirm={() => {}} onCancel={() => setDeleteUserId(null)} />
    </MainLayout>

  );
}
export default UsersTable;
