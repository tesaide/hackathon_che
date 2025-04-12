import React from 'react';
import { Table, Tag } from 'antd';
import { organizations } from './organization.data';

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
    render: type => {
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
    render: text => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
  },
  {
    title: 'Чи варифікована',
    dataIndex: 'is_verified',
    key: 'is_verified',
    render: val => val ? 'Yes' : 'No',
  },
  {
    title: 'Посилання на варифікаційний документ',
    dataIndex: 'verificationDocumentUrl',
    key: 'verificationDocumentUrl',
    render: text => text ? <a href={text} target="_blank" rel="noopener noreferrer">View</a> : '—',
  },
  {
    title: 'Створено о',
    dataIndex: 'created_at',
    key: 'created_at',
    render: () => new Date().toLocaleString(),
  },
];

const TableOrganization = () => (
  <Table columns={columns} dataSource={organizations} rowKey="id" />
);

export default TableOrganization;


  
  