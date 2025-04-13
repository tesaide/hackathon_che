import React, { useReducer, useState, useEffect } from "react";
import { Space, Table, Tag, Button } from 'antd';
import { accessibilityFeaturesData } from './accessibilityFeatures.data.js';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAccessibilityFeatures, addAccessibilityFeatures, updateAccessibilityFeatures, delAccessibilityFeatures } from '../actions/accessibilityFeatures';
import AccessibilityFeaturesForm from "./accessibilityFeatures.form";

export const actionTypes = { //змынити назви
  ADD_PLACE: 'ADD_PLACE',
  UPDATE_PLACE: 'UPDATE_PLACE',
  DELETE_PLACE: 'DELETE_PLACE',
  SET_PLACES: 'SET_PLACES'
};


const accessibilityFeaturesReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLACE:
      return [...state, action.payload];
    case actionTypes.UPDATE_PLACE:
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    case actionTypes.DELETE_PLACE:
      return state.filter((item) => item.id !== action.payload);
    case actionTypes.SET_PLACES:
      return action.payload;
    default:
      return state;
  }
};


const AccessibilityFeaturesTable = () => {
  const [places, dispatch] = useReducer(accessibilityFeaturesReducer, []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);

  useEffect(() => {
    getAccessibilityFeatures(dispatch);
  }, []);

  const handleDeleteLocation = async (id) => {
    try {
      await delAccessibilityFeatures(id, dispatch);
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  const handleAddAccessibilityFeatures = async (location) => {
    try {
      await addAccessibilityFeatures(location, dispatch);
    } catch (error) {
      console.error('Ошибка при добавлении:', error);
    }
  };

  const handleUpdateAccessibilityFeatures = async (location) => {
    try {
      await updateAccessibilityFeatures(location, dispatch);
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
    }
  };

  const handleStartEditing = (place) => {
    setEditingPlace(place);
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setEditingPlace(null);
    setIsEditing(false);
  };

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
      render: status => (status ? 'Available' : 'Not Available'),
    },
    {
      title: 'Quality Rating',
      dataIndex: 'qualityRating',
    },
    {
      title: 'Standards Compliance',
      dataIndex: 'standardsCompliance',
      render: compliance => (compliance ? 'Compliant' : 'Non-compliant'),
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
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => handleStartEditing(record)}
            /> 
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDeleteLocation(record.id)}
            />
       </Space>
),
    },
  ];

  return (
    <div>
      <Table rowKey="id" columns={columns} dataSource={places} pagination={{ pageSize: 5 }} />

      <Button
        type="primary"
        onClick={handleCancelEditing}
      >
        Створити локацію
      </Button>

      {isEditing ? (
        <AccessibilityFeaturesForm
          location={editingPlace}
          isEditing={true}
          onSubmit={(updateAccessibilityFeatures) => {
            handleUpdateAccessibilityFeatures(updateAccessibilityFeatures);
          }}
        />
      ) : (
        <AccessibilityFeaturesForm
          location={null}
          isEditing={editingPlace}
          onSubmit={handleAddAccessibilityFeatures}
        />
      )}
    </div>
  );
};



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




export default AccessibilityFeaturesTable;