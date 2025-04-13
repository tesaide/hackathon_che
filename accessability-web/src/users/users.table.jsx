import React, { useState } from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { users as usersData } from './users.data'; // Переименовываем, чтобы не путать
import { MainLayout } from '../common/layout/MainLayout';
import { TableActions } from '../common/TableActions';
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

function UsersTable() {
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [data, setData] = useState([...usersData]); // Копируем данные в состояние
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
      render: (val) => (<div className='flex justify-center'>{val ? <CheckOutlined style={{color: 'green'}} /> : <CloseOutlined style={{color: 'red'}} />}</div>),

    },
    {
      title: 'Час створення',
      dataIndex: 'createdAt',
    },
    {
      title: '',
      render: (text, record) => (
        <TableActions
          record={record}
          handleEdit={(id) => navigate(`/users/${id}`)}
          handleDelete={(id) => setDeleteUserId(id)}
        />
      ),
    },
  ];

  const deleteUser = () => {
    setData((prevData) => prevData.filter((user) => user.id !== deleteUserId));
    setDeleteUserId(null);
  };

  return (
    <MainLayout>
      <Table
        size="middle"
        columns={columns}
        dataSource={data}
          pagination={{pageSize: 10,pageSizeOptions : null}}
        rowKey="id" // 👈 очень важно!
      />
      <ConfirmDeleteModal
        open={!!deleteUserId}
        onConfirm={deleteUser}
        onCancel={() => setDeleteUserId(null)}
      />
    </MainLayout>
  );
}

export default UsersTable;
