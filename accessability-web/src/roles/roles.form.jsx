import React from 'react';
import {
  Button, Form, Input, Form as AntdForm,
} from 'antd';

const { TextArea } = Input;

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function RoleForm() {
  const [form] = AntdForm.useForm(); // Використовуємо статичний метод useForm компонента Form

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <AntdForm
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="Ім'я"
          name="username"
          rules={[{ required: true, message: 'Введіть ім’я!' }]}
        >
          <Input maxLength={50} />
        </Form.Item>

        <Form.Item
          label="Опис"
          name="description"
          rules={[{ message: 'Введіть опис!' }]}
        >
          <TextArea rows={4} placeholder="Введіть короткий опис..." />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24, offset: 0, style: { display: 'flex', justifyContent: 'start' } }}>
          <Button type="primary" htmlType="submit">
            Зберегти
          </Button>

          <Button
            type="default"
            style={{ marginLeft: '10px' }}
            onClick={handleReset}
          >
            Відміна
          </Button>
        </Form.Item>
      </AntdForm>
    </div>
  );
}

export default RoleForm;
