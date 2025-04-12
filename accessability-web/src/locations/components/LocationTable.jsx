import React, { useReducer, useState, useEffect } from "react";
import { Table, Button, Tag, Space } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import LocationForm from "./LocationForm";
import { getLocations, addLocation, updateLocation, delLocation } from '../actions/locations';
import {MainLayout} from "../../common/layout/MainLayout.jsx";

const statusColors = {
  draft: "default",
  pending: "orange",
  published: "green",
  rejected: "red",
};

export const actionTypes = {
  ADD_PLACE: 'ADD_PLACE',
  UPDATE_PLACE: 'UPDATE_PLACE',
  DELETE_PLACE: 'DELETE_PLACE',
  SET_PLACES: 'SET_PLACES'
};

const placesReducer = (state, action) => {
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

const LocationTable = () => {
  const [places, dispatch] = useReducer(placesReducer, []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlace, setEditingPlace] = useState(null);

  useEffect(() => {
    getLocations(dispatch);
  }, []);

  const handleDeleteLocation = async (id) => {
    try {
      await delLocation(id, dispatch);
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  const handleAddLocation = async (location) => {
    try {
      await addLocation(location, dispatch);
    } catch (error) {
      console.error('Ошибка при добавлении:', error);
    }
  };

  const handleUpdateLocation = async (location) => {
    try {
      await updateLocation(location, dispatch);
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
      title: "Назва",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Адреса",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Тип",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Категорія",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Координати",
      key: "coordinates",
      render: (_, record) =>
        `${record.coordinates?.coordinates[1] || "-"}, ${record.coordinates?.coordinates[0] || "-"}`,
    },
    {
      title: "Рейтинг доступності",
      dataIndex: "overall_accessibility_score",
      key: "overall_accessibility_score",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: "Дії",
      key: "actions",
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
    <MainLayout>
      <Table rowKey="id" columns={columns} dataSource={places} pagination={{ pageSize: 5 }} />

      <Button
        type="primary"
        onClick={handleCancelEditing}
      >
        Створити локацію
      </Button>

      {isEditing ? (
        <LocationForm
          location={editingPlace}
          isEditing={true}
          onSubmit={(updatedLocation) => {
            handleUpdateLocation(updatedLocation);
          }}
        />
      ) : (
        <LocationForm
          location={null}
          isEditing={editingPlace}
          onSubmit={handleAddLocation}
        />
      )}
    </MainLayout>
  );
};

export default LocationTable;

