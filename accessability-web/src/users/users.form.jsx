import React from 'react';
import {users} from './users.data'

import {MainLayout} from '../common/layout/MainLayout'

import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  TreeSelect,
} from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { useParams } from 'react-router';

const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

function UsersForm() {
  const params = useParams();


  const userInfo = users.find((u) => u.id === params.id);

    console.log('inf' , userInfo)


  const [form] = Form.useForm();
  const variant = Form.useWatch('outlined', form);

  const onFinish = (values) => {
    console.log('Success:', values);
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };




  return (
    <MainLayout>

        <Form
        {...formItemLayout}
        layout="vertical"
        form={form}
        variant={variant || 'outlined'}
        style={{ maxWidth: 2000, width: 900 }}
        initialValues={{ variant: 'filled', 
          fullName:userInfo?.fullName,
          email: userInfo?.email,
          phone: userInfo?.phone,
          role : userInfo?.role,
          
          
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >

        <Form.Item
          label="ПІБ"
          name="fullName"
          rules={[
            { required: true, message: 'Введіть ПІБ!' },
            { type: 'string', message: 'Перевірте правильність вводу!' },
          ]}
          >
          <Input placeholder="Прізвище Ім'я Побатькові" />
        </Form.Item>

        <Form.Item
          label="Електронна адреса"
          name="email"
          rules={[
            { required: true, message: 'Введіть вашу електронну адресу!' },
            { type: 'email', message: 'Перевірте правильність вводу електронної адреси' },
          ]}
          >
          <Input placeholder="example@mail.com" />
        </Form.Item>

        <Form.Item label="Номер телефону" name="phone" rules={[{ required: true, message: 'Введіть ваш номер телефону!' }]}>
          {/* eslint-disable-next-line no-octal-escape */}
          <MaskedInput mask="+38(\000) 000 00 00" />
        </Form.Item>

        <Form.Item label="Роль" name="role" rules={[{ required: true, message: 'Оберіть вашу роль' }]}>
          <Select>
            <Select.Option value="1">
              Demo
            </Select.Option>
            <Select.Option value="2">
              Demo2
            </Select.Option>
            <Select.Option value="3">
              Demo
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Організація" name="organization" rules={[{ required: false }]}>
          <Select>
            <Select.Option value="null"></Select.Option>
            <Select.Option value="1">
              Demo
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Зберегти
          </Button>
        </Form.Item>
      </Form>
        </MainLayout>
        
  );
}

export default UsersForm;
