import React, { useEffect, useState, useCallback } from 'react';
import {
  Form, Input, Button, InputNumber, Divider,
} from 'antd';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../../common/layout/MainLayout';
import { addLocation, updateLocation } from '../actions/locations';
import { useNavigate } from 'react-router-dom';
import LocationGoogleMapForm from './LocationGoogleMapForm'

const { TextArea } = Input;
const googleMapsApiKey = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCoordinates = {
  lat: 51.4982,
  lon: 31.2849,
};

const LocationForm = ({ locations, isEditing }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [coordinates, setCoordinates] = useState(defaultCoordinates);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing && locations?.length) {
      const found = locations.find((loc) => loc.id === id);
      if (found) {
        setSelectedLocation(found);
        const { name, address, type, category, description, contacts, working_hours, coordinates: coords } = found;

        form.setFieldsValue({
          name,
          address,
          lat: coords.coordinates[1],
          lon: coords.coordinates[0],
          type,
          category,
          description,
          phones: contacts.phones.join(','),
          emails: contacts.emails.join(','),
          working_hours,
        });

        setCoordinates({
          lat: coords.coordinates[1],
          lon: coords.coordinates[0],
        });
      }
    }
  }, [id, isEditing, locations, form]);

  const handleMapClick = useCallback((e) => {
    const lat = e.latLng.lat();
    const lon = e.latLng.lng();
    setCoordinates({ lat, lon });
    form.setFieldsValue({ lat, lon });
  }, [form]);

  
  const handleSubmit = (values) => {
    const {
      name, address, lat, lon, type, category,
      description, phones, emails, working_hours,
    } = values;

    const locationData = {
      ...(selectedLocation || {}),
      name,
      address,
      coordinates: {
        type: 'Point',
        coordinates: [lon, lat],
      },
      type,
      category,
      description,
      contacts: {
        phones: phones.split(',').map(s => s.trim()),
        emails: emails.split(',').map(s => s.trim()),
      },
      working_hours,
      updated_at: new Date().toISOString(),
    };

    isEditing ? updateLocation(locationData) : addLocation(locationData);

    navigate('/locations');
  };

  return (
    <MainLayout>
      <h2>{isEditing ? 'Оновити локацію' : 'Створити нову локацію'}</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Назва" name="name" rules={[{ required: true, message: 'Введіть назву!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Адреса" name="address" rules={[{ required: true, message: 'Введіть адресу!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Тип" name="type" rules={[{ required: true, message: 'Введіть тип локації!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Категорія" name="category" rules={[{ required: true, message: 'Введіть категорію!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Опис" name="description" rules={[{ required: true, message: 'Введіть опис!' }]}>
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Телефони (через кому)" name="phones" rules={[{ required: true, message: 'Введіть телефони!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email (через кому)" name="emails" rules={[{ required: true, message: 'Введіть email!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Робочий час" name="working_hours" rules={[{ required: true, message: 'Введіть робочий час!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Координати (широта, довгота)" required>
          <Form.Item name="lat" noStyle rules={[{ required: true, message: 'Введіть широту!' }]}>
            <InputNumber style={{ width: '48%' }} placeholder="Широта" />
          </Form.Item>
          <Form.Item name="lon" noStyle rules={[{ required: true, message: 'Введіть довготу!' }]}>
            <InputNumber style={{ width: '48%', marginLeft: '4%' }} placeholder="Довгота" />
          </Form.Item>
        </Form.Item>

        <Divider />
            <LocationGoogleMapForm
                lat={coordinates.lat}
                lon={coordinates.lon}
                onClick={handleMapClick}
            />
        <Divider />

        <Button type="primary" htmlType="submit">
          {isEditing ? 'Оновити локацію' : 'Додати локацію'}
        </Button>
      </Form>
    </MainLayout>
  );
};

export default LocationForm;
