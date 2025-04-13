import { Layout, Menu } from 'antd';
import {
  EnvironmentOutlined,
  FileTextOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router';
import React, { useEffect, useState } from 'react';
import './andt_selected.css';
import Header from './Header';

const { Sider, Content } = Layout;

// eslint-disable-next-line react/prop-types
export function MainLayout({ children }) {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState('');

  useEffect(() => {
    const id = location.pathname.split('/')[1]; // Получаем часть пути
    setActiveKey(id); // Устанавливаем ключ активного элемента меню
  }, [location.pathname]);

  return (
    <>
      <Header />

      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={250} className="!pt-2 !pr-1 !bg-white !border-[1px] !border-t-0 !border-gray-200">
          <Menu mode="vertical" selectedKeys={activeKey} className="!border-none">
            <Menu.Item key="users" icon={<UserOutlined />}>
              <NavLink key="nav_users" to="/users">Користувачі</NavLink>
            </Menu.Item>
            <Menu.Item key="roles" icon={<FileTextOutlined />}>
              <NavLink key="nav_roles" to="/roles">Ролі</NavLink>
            </Menu.Item>
            <Menu.Item key="organizations" icon={<HomeOutlined />}>
              <NavLink key="nav_organizations" to="/organizations">Організації</NavLink>
            </Menu.Item>
            <Menu.Item key="locations" icon={<EnvironmentOutlined />}>
              <NavLink key="nav_locations" to="/locations">Локації</NavLink>
            </Menu.Item>
            <Menu.Item key="accessibility-features" icon={<UnorderedListOutlined />}>
              <NavLink key="nav_accessibility" to="/accessibility-features">Критерії безбар&#39;єрності</NavLink>
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
