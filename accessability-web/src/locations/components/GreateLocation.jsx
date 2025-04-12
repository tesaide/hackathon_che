import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Divider } from 'antd';

const { TextArea } = Input;

const CreateLocation = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const newLocation = {
      id: Date.now().toString(),
      name: values.name,
      address: values.address,
      coordinates: {
        type: 'Point',
        coordinates: [values.lon, values.lat],
      },
      type: values.type,
      category: values.category,
      description: values.description,
      contacts: {
        phones: values.phones.split(','),
        emails: values.emails.split(','),
      },
      working_hours: values.working_hours,
      status: 'pending', // Default status
      overall_accessibility_score: 80, // Example value
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    onSubmit(newLocation);
    form.resetFields(); 
  };

  return (
    <div>
      <h2>Створити нову локацію</h2>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Назва" name="name" rules={[{ required: true, message: 'Введіть назву!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Адреса" name="address" rules={[{ required: true, message: 'Введіть адресу!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Координати (Latitude, Longitude)" required>
          <Form.Item name="lat" noStyle rules={[{ required: true, message: 'Введіть широту!' }]}>
            <InputNumber style={{ width: '48%' }} placeholder="Широта" />
          </Form.Item>
          <Form.Item name="lon" noStyle rules={[{ required: true, message: 'Введіть довготу!' }]}>
            <InputNumber style={{ width: '48%', marginLeft: '4%' }} placeholder="Довгота" />
          </Form.Item>
        </Form.Item>

        <Form.Item label="Тип" name="type" rules={[{ required: true, message: 'Введіть тип локації!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Категорія" name="category" rules={[{ required: true, message: 'Введіть категорію!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Опис" name="description" rules={[{ required: true, message: 'Введіть опис!' }]}>
          <TextArea />
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

        <Button type="primary" htmlType="submit">Додати локацію</Button>
      </Form>
    </div>
  );
};

export default CreateLocation;
