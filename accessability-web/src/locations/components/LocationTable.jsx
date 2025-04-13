import React, { useReducer, useState, useEffect } from 'react';
import {
  Table, Button, Tag, Space,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// eslint-disable-next-line import/no-cycle

import { useNavigate } from 'react-router-dom';
import {
  getLocationsWithDispatch, delLocationWithDispatch,
} from '../actions/locations';
import { MainLayout } from '../../common/layout/MainLayout';
import { TableActions } from '../../common/TableActions';

const statusColors = {
  draft: 'default',
  pending: 'orange',
  published: 'green',
  rejected: 'red',
};

export const actionTypes = {
  ADD_LOCATION: 'ADD_LOCATION',
  UPDATE_LOCATION: 'UPDATE_LOCATION',
  DELETE_LOCATION: 'DELETE_LOCATION',
  SET_LOCATIONS: 'SET_LOCATIONS',
};

const locationReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_LOCATION:
      return [...state, action.payload];
    case actionTypes.UPDATE_LOCATION:
      return state.map((item) => (item.id === action.payload.id ? { ...item, ...action.payload } : item));
    case actionTypes.DELETE_LOCATION:
      return state.filter((item) => item.id !== action.payload);
    case actionTypes.SET_LOCATIONS:
      return action.payload;
    default:
      return state;
  }
};

function LocationTable() {
  const [locations, dispatch] = useReducer(locationReducer, []);
  const navigate = useNavigate();

  useEffect(() => {
    getLocationsWithDispatch(dispatch);
  }, []);

  const handleDeleteLocation = async (id) => {
    try {
      await delLocationWithDispatch(id, dispatch);
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
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
      title: 'Адреса',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Категорія',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Координати',
      key: 'coordinates',
      render: (_, record) => `${record.coordinates?.coordinates[1] || '-'}, ${record.coordinates?.coordinates[0] || '-'}`,
    },
    {
      title: 'Рейтинг доступності',
      dataIndex: 'overall_accessibility_score',
      key: 'overall_accessibility_score',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: 'Дії',
      key: 'actions',
      render: (_, record) => (
        <TableActions
          record={record}
          handleEdit={(recordId) => navigate(`/locations/update/${recordId}`, {
            state: {
              locations,
              isEditing: true,
            },
          })}

          handleDelete={(recordId) => handleDeleteLocation(recordId)}
        />
      ),
    },
  ];

  return (
    <MainLayout>
      <Table size="middle" rowKey="id" columns={columns} dataSource={locations} pagination={{ pageSize: 5 }} />
      <Button
        type="primary"
        onClick={() => navigate('/locations/create', {
          state: {
            locations: null,
            isEditing: false,
          },
        })}
      >
        Створити локацію
      </Button>
    </MainLayout>
  );
}

export default LocationTable;
