import React from 'react';
import { Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

// eslint-disable-next-line react/prop-types
export function TableActions({ record, handleEdit, handleDelete }) {
  return (
    <Space size="small">
      <Button
        icon={<EditOutlined />}
        type="primary"
        /* eslint-disable-next-line react/prop-types */
        onClick={() => handleEdit(record.id)}
      />
      <Button
        icon={<DeleteOutlined />}
        danger
          /* eslint-disable-next-line react/prop-types */
        onClick={() => handleDelete(record.id)}
      />
    </Space>
  );
}
