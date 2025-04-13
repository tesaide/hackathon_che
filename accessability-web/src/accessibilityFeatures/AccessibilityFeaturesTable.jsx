import React, { useState } from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../common/layout/MainLayout';
import { CreateEntityBtn } from '../common/CreateEntityBtn';
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';
import { TableActions } from '../common/TableActions';
import { accessibilityFeaturesData } from './accessibilityFeatures.data';

function AccessibilityFeaturesTable() {
  const [deleteAFId, setDeleteAFId] = useState(null);
  const navigate = useNavigate();
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Назва',
      dataIndex: 'name',
    },
    {
      title: 'Вага для оцінки',
      dataIndex: 'qualityRating',
    },
    {
      title: 'Згідно НПА',
      dataIndex: 'standardsCompliance',
      render: (compliance) => (compliance ? 'Compliant' : 'Non-compliant'),
    },
    {
      title: 'Дата створення',
      dataIndex: 'createdAt',
    },
    {
      title: '',
      render: (text, record) => (
        <TableActions
          record={record}
          handleEdit={(id) => navigate(`/users/${id}`)}
          handleDelete={(id) => setDeleteAFId(id)}
        />
      ),
    },
  ];

  return (
    <MainLayout>
      <CreateEntityBtn redirectTo="/accessibility-features/create" />
      <Table size="middle" columns={columns} dataSource={accessibilityFeaturesData} />
      <ConfirmDeleteModal open={!!deleteAFId} onConfirm={() => {}} onCancel={() => setDeleteAFId(null)} />
    </MainLayout>
  );
}

export default AccessibilityFeaturesTable;
