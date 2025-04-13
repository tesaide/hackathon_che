import { Avatar, Dropdown, Menu } from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  PoweroffOutlined, LoginOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const nav = useNavigate();
  // const [language, setLanguage] = useState('ukr');
  // const [authorized, setAuthorized] = useState({});
  function Login() {
    nav('/login');
  }
  const menu = (
    <Menu
      mode="vertical"
    >
      <Menu.SubMenu key="1" icon={<SolutionOutlined />} title="Профіль">
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <Menu.Item key="2" icon={<LoginOutlined />} onClick={Login}>Увійти</Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="7" icon={<PoweroffOutlined />}>Вийти</Menu.Item>
    </Menu>
  );

  return (
    <div className="w-full h-[50px] px-4 py-8 flex justify-between items-center border-b-[1px] border-gray-200">
      <div className="flex flex-row">
        <img src="/Vector 5.svg" alt="" />
        <div className="flex flex-col text-2xl ml-3">
          <span className="text-black">Чернігів</span>
          <span className="text-[#80D584] mt-[-7px]">БЕЗБАР&#39;ЄРНИЙ</span>
        </div>
      </div>
      <Dropdown overlay={menu} trigger={['click']}>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </div>
  );
}
