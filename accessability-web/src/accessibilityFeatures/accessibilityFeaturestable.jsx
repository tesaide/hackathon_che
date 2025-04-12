import React from 'react';
import { Space, Table, Tag } from 'antd';
import { accessibilityFeaturesData } from './accessibilityFeaturesdata';
import {Link} from "react-router-dom";

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Location ID',
    dataIndex: 'locationId',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Subtype',
    dataIndex: 'subtype',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status) => (status ? 'Available' : 'Not Available'),
  },
  {
    title: 'Quality Rating',
    dataIndex: 'qualityRating',
  },
  {
    title: 'Standards Compliance',
    dataIndex: 'standardsCompliance',
    render: (compliance) => (compliance ? 'Compliant' : 'Non-compliant'),
  },
  {
    title: 'Created By',
    dataIndex: 'createdBy',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
  },
  {
    title: 'Action',
    render: (_, record) => (
      <Space size="middle">
        {/* eslint-disable-next-line no-use-before-define */}
        <Link to="/edit" onClick={(e) => handleEdit(e, record)}>Edit</Link>
        {/* eslint-disable-next-line no-use-before-define */}
        <Link to="/delete" onClick={(e) => handleDelete(e, record)}>Delete</Link>
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

function AccessibilityFeaturesTable() {
  return <Table columns={columns} dataSource={accessibilityFeaturesData} />;
}

export default AccessibilityFeaturesTable;
