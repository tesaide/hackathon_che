import { Layout, Menu } from 'antd';
import { FileTextOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router';
import React from 'react';
import Header from './Header';

const { Sider, Content } = Layout;

export function MainLayout({ children }) {
  return (
    <>
      <Header />

      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={300} className="bg-gray-800 text-white">
          <Menu mode="vertical">
            <Menu.Item key="1" icon={<HomeOutlined />} className="hover:bg-blue-500">
              <NavLink to="/users">Користувачі</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<FileTextOutlined />} className="hover:bg-blue-500">
              <NavLink to="/roles">Ролі</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />} className="hover:bg-blue-500">
              <NavLink to="/organizations">Організації</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<FileTextOutlined />} className="hover:bg-blue-500">
              <NavLink to="/locations">Локації</NavLink>
            </Menu.Item>
            <Menu.Item key="5" icon={<FileTextOutlined />} className="hover:bg-blue-500">
              <NavLink to="/accessibility-features">Критерії безбар'єрності</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="w-full">
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
    </>
  );
}
