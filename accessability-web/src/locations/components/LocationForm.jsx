import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../../common/layout/MainLayout';
import { addLocation, updateLocation } from '../actions/locations';
import { useNavigate } from 'react-router-dom';
import LocationGoogleMapForm from './LocationGoogleMapForm'
import { forms } from '../../common/consts';
import { Select } from 'antd';

const locationTypes = [
  { label: 'Державна установа', value: 'government_building' },
  { label: 'Бізнес', value: 'business' },
  { label: 'Охорона здоров’я', value: 'healthcare' },
  { label: 'Освіта', value: 'education' },
  { label: 'Культура', value: 'culture' },
  { label: 'Транспорт', value: 'transport' },
  { label: 'Відпочинок', value: 'recreation' },
  { label: 'Інше', value: 'other' },
];


import { Row, Col, Form, Input, InputNumber, Button, Divider } from 'antd';
const { TextArea } = Input;

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
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Назва"
              name="name"
              rules={[{ required: true, message: forms.fieldEmpty }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Тип"
              name="type"
              rules={[{ required: true, message: forms.fieldEmpty }]}
            >
              <Select
                options={locationTypes}
                placeholder="Оберіть тип"
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>


        <Form.Item label="Опис" name="description" rules={[{ required: true, message: forms.fieldEmpty }]}>
          <TextArea rows={3} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Телефони (через кому)" name="phones" rules={[{ required: true, message: forms.fieldEmpty }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email (через кому)" name="emails" rules={[{ required: true, message: forms.fieldEmpty }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Адреса" name="address" rules={[{ required: true, message: forms.fieldEmpty }]}>
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Широта" name="lat" rules={[{ required: true, message: forms.fieldEmpty }]}>
              <InputNumber style={{ width: '100%' }} placeholder="Широта" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Довгота" name="lon" rules={[{ required: true, message: forms.fieldEmpty }]}>
              <InputNumber style={{ width: '100%' }} placeholder="Довгота" />
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <LocationGoogleMapForm
          lat={coordinates.lat}
          lon={coordinates.lon}
          onClick={handleMapClick}
        />

        <Divider />

        <Button type="primary" htmlType="submit">
          {forms.save}
        </Button>
      </Form>
    </MainLayout>
  );
};

export default LocationForm;
