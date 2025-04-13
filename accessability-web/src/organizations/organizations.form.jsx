import React, { useEffect } from 'react';
import { useForm } from 'antd/es/form/Form';
import { useParams } from 'react-router';
import {
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import { organizations } from './organization.data';

const onFinish = (values) => {
  console.log('Submitted data:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
function FromOrganization() {
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
  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Назва"
        name="name"
        rules={[
          { required: true, message: 'Будь-ласка, введіть назву організації!' },
          { max: 255 },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Тип"
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
        rules={[
          { required: false, message: 'Будь-ласка, введіть посилання на варифікаційний документ!' },
          { type: 'url' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
export default FromOrganization;
