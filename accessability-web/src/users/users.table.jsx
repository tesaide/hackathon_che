import React from 'react';
import { Space, Table, Tag, Input } from 'antd';
import { users } from './users.data.js' 
import { useState } from 'react';

const { Search } = Input;

const columns = [
{
    title : "id",
    dataIndex : "id"
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
    title: 'Phone',
    dataIndex: 'phone',
  },


  {
    title: 'VerificationStatus',
    dataIndex: 'verificationStatus',
  },
  {
    title: 'CreatedAt',
    dataIndex: 'createdAt'
  },
];

const UsersTable = () => {
    const [usersData, setUsersData] = useState([...users]);
    const handleSearch = (searchString) => {
        const newUsersData = usersData.filter(u => u.fullName.includes(searchString));
        setUsersData(newUsersData);
    };

    const getStandart = () => {
        setUsersData(users)
        console.log("getStandart")
    }
    

    return (
        <div>
            <Search
            placeholder="Search by name or email"
            onSearch= {handleSearch}
            onClear={getStandart}
            style={{ marginBottom: 16, width: 300 }}
            allowClear/>,
            <Table columns={columns} dataSource={usersData} />
        </div>


    );
};
export default UsersTable;