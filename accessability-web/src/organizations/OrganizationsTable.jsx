import React, { useState } from 'react';
import { Table, Tag, Button } from 'antd';
import { useNavigate } from 'react-router';
import { organizations } from './organization.data';
import { MainLayout } from '../common/layout/MainLayout';
import { TableActions } from '../common/TableActions';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { CreateEntityBtn } from '../common/CreateEntityBtn';
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';

function OrganizationTable() {
  const navigate = useNavigate();
  const [deleteOrganizationId, setDeleteOrganizationId] = useState(null);
  const [data, setData] = useState([...organizations]); 
  const deleteOrganizations = () => {
    setData((prevData) => prevData.filter((organizations) => organizations.id !== deleteOrganizationId));
    setDeleteOrganizationId(null);
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Назва',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        let color = '';
        switch (type) {
          case 'Уряд':
            color = 'green';
            break;
          case 'Бізнес':
            color = 'geekblue';
            break;
          case 'Громадська організація':
            color = 'volcano';
            break;
          default:
            color = 'default';
        }
        return (
          <Tag color={color}>
            {type.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'ЄДРПОУ',
      dataIndex: 'edrpou',
      key: 'edrpou',
    },
    {
      title: 'Веб-сторінка',
      dataIndex: 'website',
      key: 'website',
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
    },
    {
      title: 'Верифікована',
      dataIndex: 'is_verified',
      key: 'is_verified',
      render: (val) => (<div className='flex justify-center'>{val ? <CheckOutlined style={{color: 'green'}} /> : <CloseOutlined style={{color: 'red'}} />}</div>),
    },
    {
      title: 'Верифікаційний документ',
      dataIndex: 'verificationDocumentUrl',
      key: 'verificationDocumentUrl',
      render: (text) => (text ? <a href={text} target="_blank" rel="noopener noreferrer">Переглянути</a> : '—'),
    },
    {
      title: 'Створено',
      dataIndex: 'created_at',
      key: 'created_at',
      render: () => new Date().toLocaleString(),
    },
    {
      title: '',
      render: (_, record) => (
        <TableActions
          record={record}
          handleEdit={(id) => navigate(`/organizations/${id}`)}
          handleDelete={(id) => setDeleteOrganizationId(id)}
        />
      ),
    },
  ];

  return (
    <MainLayout>
      <CreateEntityBtn redirectTo="/organizations/create" />
      <Table columns={columns} dataSource={data} rowKey="id" size='middle' />
      <ConfirmDeleteModal open={!!deleteOrganizationId} onConfirm={deleteOrganizations} onCancel={() => setDeleteOrganizationId(null)} />
    </MainLayout>
  );
}

export default OrganizationTable;
