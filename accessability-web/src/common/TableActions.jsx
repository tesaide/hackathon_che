import React from 'react';
import { Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export function TableActions({ record, handleEdit, handleDelete }) {
  return (
    <Space size="middle">
      <Button
        icon={<EditOutlined />}
        type="primary"
        onClick={() => handleEdit(record.id)}
      />
      <Button
        icon={<DeleteOutlined />}
        danger
        onClick={() => handleDelete(record.id)}
      />
    </Space>
  );
}
