import React from 'react';
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    FileTextOutlined,
    BankOutlined,
    EnvironmentOutlined, UnorderedListOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";

const { Sider, Content } = Layout;

const AppBar = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={300} className="!bg-white text-white">
                <Menu mode="vertical" className={"!bg-white"}>
                    <Menu.Item key="1" icon={<UserOutlined />} className={"!rounded-xs !bg-white mt-4  hover:!bg-gray-100 "}>
                        <Link className={"!text-black"} to="/users">Користувачі</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FileTextOutlined />} className={"!rounded-xs !bg-white mt-4 hover:!bg-gray-100 "}>
                        <Link className={"!text-black"}  to="/roles">Ролі</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<BankOutlined />} className={"!rounded-xs !bg-white mt-4 hover:!bg-gray-100 "}>
                        <Link className={"!text-black"} to="/organizations">Організації</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<EnvironmentOutlined />} className={"!rounded-xs !bg-white mt-4 hover:!bg-gray-100 "}>
                        <Link className={"!text-black"} to="/locations">Локації</Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<UnorderedListOutlined />} className={"!rounded-xs !bg-white mt-4 hover:!bg-gray-100"}>
                        <Link className={"!text-black"} to="/accessibility-features">Критерії безбар'єрності</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout className={"w-full"}>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        backgroundColor: '#fff',
                    }}
                >
                    <div className="m-4">
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppBar;
