import React from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Space,
} from 'antd';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function FromOrganization() {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="basic"
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
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={handleReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default FromOrganization;
