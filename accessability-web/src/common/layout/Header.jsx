import { Avatar, Dropdown, Menu } from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  TranslationOutlined,
  PoweroffOutlined, LoginOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const nav = useNavigate();
  // const [language, setLanguage] = useState('ukr');
  // const [authorized, setAuthorized] = useState({});
  function Login({ setAuthorized }) {
    nav('/login');
  }
  const menu = (
    <Menu
      mode="vertical"
    >
      <Menu.SubMenu key="1" icon={<SolutionOutlined />} title="Профіль">
        <Menu.Item key="2" icon={<LoginOutlined />}>Увійти</Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="3" icon={<TranslationOutlined />} title="Змінити мову">
        <Menu.Item onClick={() => {}} key="4">Українська</Menu.Item>
        <Menu.Item key="5">English</Menu.Item>
        <Menu.Item key="6">Deutsch</Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="7" icon={<PoweroffOutlined />}>Вийти</Menu.Item>
    </Menu>
  );

  return (
    <div className="w-full h-[50px] px-4 py-8 flex justify-between items-center border-b-[1px] border-gray-100">
      <p className="text-xl text-gray-500 ">Мапа безбар&#39;єрності</p>
      <Dropdown overlay={menu} trigger={['click']}>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </div>
  );
}
