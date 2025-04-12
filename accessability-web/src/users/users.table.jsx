import React, { useState } from 'react';
import {
  Space, Table, Tag, Input,
} from 'antd';
import { users } from './users.data';
import { MainLayout } from "../common/layout/MainLayout.jsx";
import { TableActions } from "../common/TableActions.jsx";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

function UsersTable() {
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
      render: (status) => status ? '✅' : '❌',
    },
    {
      title: 'Час створення',
      dataIndex: 'createdAt',
    },
    {
      title: '',
      render: (text, record) => <TableActions record={record} handleEdit={(id) => navigate(`/users/${id}`)}/>
    }
  ];

  // const [usersData, setUsersData] = useState([...users]);
  // const handleSearch = (searchString) => {
  //   const newUsersData = usersData.filter((u) => u.fullName.includes(searchString));
  //   setUsersData(newUsersData);
  // };
  //
  // const getStandart = () => {
  //   setUsersData(users);
  //   console.log('getStandart');
  // };

  return (
    <MainLayout>
      {/*<Search*/}
      {/*  placeholder="Search by name or email"*/}
      {/*  onSearch={handleSearch}*/}
      {/*  onClear={getStandart}*/}
      {/*  style={{ marginBottom: 16, width: 300 }}*/}
      {/*  allowClear*/}
      {/*/>*/}
      <Table columns={columns} dataSource={users} />
    </MainLayout>

  );
}
export default UsersTable;
