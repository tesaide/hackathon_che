import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Alert,
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import { organizations } from './organization.data';
import { MainLayout } from '../common/layout/MainLayout';

const onFinish = (values) => {
  console.log('Submitted data:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
function OrganizationForm() {
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    const organization = organizations.find((org) => org.id === id);
    if (organization) {
      form.setFieldsValue({
        name: organization.name,
        type: organization.type,
        edrpou: organization.edrpou,
        website: organization.website,
        isVerified: organization.isVerified,
        verificationDocumentUrl: organization.verificationDocumentUrl,
      });
    }
  }, [id, form]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      const organization = organizations.find((org) => org.id === id);

      if (organization) {
        organization.name = form.getFieldValue('name');
        organization.type = form.getFieldValue('type');
        organization.edrpou = form.getFieldValue('edrpou');
        organization.website = form.getFieldValue('website');
        organization.isVerified = form.getFieldValue('isVerified');
        organization.verificationDocumentUrl = form.getFieldValue('verificationDocumentUrl');
      }
    } else {
      organizations.push({
        id: Date.now(),
        name: form.getFieldValue('name'),
        type: form.getFieldValue('type'),
        edrpou: form.getFieldValue('edrpou'),
        website: form.getFieldValue('website'),
        isVerified: form.getFieldValue('isVerified'),
        verificationDocumentUrl: form.getFieldValue('verificationDocumentUrl'),
        createdAt: new Date(),
      });
    }

    setSuccess(true);
  };

  return (
    <MainLayout >

      {success && (
        <Alert
          message="Дані успішно збережено"
          type="success"
          closable
          onClose={() => setSuccess(false)}
        />
      )}

      <Form
        name="basic"
        form={form}
        className='!flex !flex-col !justify-center !items-center'
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size='middle'
        style={{ maxWidth: 2000, width: 900 }}
      >
        <Form.Item
          label="Назва"
          name="name"
          className='!w-1/3 !h-auto'
          rules={[
            { required: true, message: 'Будь-ласка, введіть назву організації!' },
            { max: 255 },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Тип"
          className='!w-1/3 !h-auto'
          name="type"
          rules={[
            { required: false, message: 'Будь-ласка, введіть тип!' },
          ]}
        >
          <Select>
            <Select.Option value="Уряд">Уряд</Select.Option>
            <Select.Option value="Бізнес">Бізнес</Select.Option>
            <Select.Option value="Громадська організація">Громадська організація</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="ЄДРПОУ"
          name="edrpou"
          className='!w-1/3 !h-auto'
          rules={[
            { required: false, message: 'Будь-ласка, введіть ЄДРПОУ!' },
            { max: 9 },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Веб-сторінка"
          name="website"
          className='!w-1/3 !h-auto'
          rules={[
            { required: false },
            { type: 'url' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Посилання на варифікаційний документ"
          name="verificationDocumentUrl"
          className='!w-1/3 !h-auto'
          rules={[
            { required: false, message: 'Будь-ласка, введіть посилання на варифікаційний документ!' },
            { type: 'url' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null} className='!w-1/3 !h-auto'>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Зберегти
          </Button>
        </Form.Item>
      </Form>

    </MainLayout>
  );
}
export default OrganizationForm;
