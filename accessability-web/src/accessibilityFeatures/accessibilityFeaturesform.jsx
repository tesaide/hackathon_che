import React from 'react';

import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Rate,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
  } from 'antd';
 
  import { Form as AntdForm } from 'antd';


const { TextArea } = Input;

const onFinish = values => {
    console.log('Success:', values);
};

const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};





const AccessibilityFeaturesForm = () => {


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
                    label="Тип"
                    name="type"
                    rules={[{ required: true, message: 'Будь-ласка, введіть тип!' }]}
                >
                    <Select>
                        <Select.Option value="Ліфт">Ліфт</Select.Option>
                        <Select.Option value="Кнопка виклику">Кнопка виклику</Select.Option>
                        <Select.Option value="Тактильний шлях">Тактильний шлях</Select.Option>
                        <Select.Option value="Доступний туалет">Доступний туалет</Select.Option>
                        <Select.Option value="Паркування">Паркування</Select.Option>
                        <Select.Option value="Вхід">Вхід</Select.Option>
                        <Select.Option value="Інтер'єр">Інтер'єр</Select.Option>
                        <Select.Option value="Інформаційні таблички">Інформаційні таблички</Select.Option>
                        <Select.Option value="Інше">Інше</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Додаткова класифікація"
                    name="subtype"
                    rules={[{  message: 'Введіть ім’я!' }]}
                >
                    <Input maxLength={100} placeholder="Максимум 100 символів" />
                </Form.Item>

                <Form.Item 
                    label="Опис"
                    name="description"
                    rules={[{ message: 'Введіть опис!' }]}
                    >
                    <Input.TextArea 
                        maxLength={255} 
                        placeholder="Максимум 255 символів" 
                        autoSize={{ minRows: 3, maxRows: 6 }} 
                    />
                </Form.Item>


                <div style={{ display: 'flex', gap: '24px' }}>
                    <Form.Item
                        name="status"
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                    >
                        <Checkbox>Наявність елементу</Checkbox>
                    </Form.Item>

                    <Form.Item
                        name="standardsCompliance"
                        valuePropName="checked"
                        style={{ marginBottom: 8 }}
                    >
                        <Checkbox>Відповідність ДБН</Checkbox>
                    </Form.Item>
                </div>


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
};



export default AccessibilityFeaturesForm;





