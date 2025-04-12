import React from 'react';
import { Table, Tag, Button } from 'antd';
import { organizations } from './organization.data';
import { MainLayout } from '../common/layout/MainLayout';
import { useNavigate } from 'react-router';
import { TableActions } from '../common/TableActions';
import FromOrganization from './organizations.form';

function OrganizationTable() {
  const navigate = useNavigate();
  const handleCreateForm = () => {
    navigate(`/organizations/create`);
  };  
  const columns = [
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
      title: 'Чи варифікована',
      dataIndex: 'is_verified',
      key: 'is_verified',
      render: (val) => (val ? 'Yes' : 'No'),
    },
    {
      title: 'Посилання на варифікаційний документ',
      dataIndex: 'verificationDocumentUrl',
      key: 'verificationDocumentUrl',
      render: (text) => (text ? <a href={text} target="_blank" rel="noopener noreferrer">View</a> : '—'),
    },
    {
      title: 'Створено',
      dataIndex: 'created_at',
      key: 'created_at',
      render: () => new Date().toLocaleString(),
    },
    {
      title: '',
      render: (text, record) => <TableActions 
      record={record} 
      handleEdit={(id) => navigate(`/organizations/${id}`)} 
      handleDelete={(id) => {
        const index = organizations.findIndex(org => org.id === id);
        if (index !== -1) {
          organizations.splice(index, 1);
        }
      }}
      />
    },
  ];

  return (
    <MainLayout>
      <Table columns={columns} dataSource={organizations} rowKey="id" />
      <Button
        type="primary"
        onClick={handleCreateForm}
      >
        Створити сутність
      </Button>
    </MainLayout>
)
}

export default OrganizationTable;
  