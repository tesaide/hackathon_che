import React from 'react';
import { Form, Input, Button } from 'antd';

function Login() {
  const onFinish = (values) => {
    console.log('Received values:', values);
    alert('Форма отправлена!');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Form
        name="myForm"
        onFinish={onFinish}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <Form.Item
          name="input1"
          rules={[{ required: true, message: 'Пожалуйста, введите первое значение!' }]}
        >
          <Input placeholder="Введите первое значение" className="border border-gray-300 rounded-md p-2" />
        </Form.Item>

        <Form.Item
          name="input2"
          rules={[{ required: true, message: 'Пожалуйста, введите второе значение!' }]}
        >
          <Input placeholder="Введите второе значение" className="border border-gray-300 rounded-md p-2" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
