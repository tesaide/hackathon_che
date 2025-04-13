import React from 'react';
import { Layout, Menu, ConfigProvider } from 'antd';
import { HomeOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router';

const { Sider, Content } = Layout;

// eslint-disable-next-line react/prop-types
function AppBar({ children }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            colorItemBg: 'white',
            colorItemBgSelected: '#e6f7ff',
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider width={300}>
          <Menu
            mode="vertical"
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <NavLink to="/users">Користувачі</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<FileTextOutlined />}>
              <NavLink to="/roles">Ролі</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <NavLink to="/organizations">Організації</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<FileTextOutlined />}>
              <NavLink to="/locations">Локації</NavLink>
            </Menu.Item>
            <Menu.Item key="5" icon={<FileTextOutlined />}>
              <NavLink to="/accessibility-features">Критерії безбар&#39;єрності</NavLink>
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
    </ConfigProvider>
  );
}

export default AppBar;
