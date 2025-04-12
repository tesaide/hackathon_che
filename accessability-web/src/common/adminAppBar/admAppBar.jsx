import React, {useState} from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;

const AdmAppbar = ({ selectedTab, elementToShow }) => {
    const nav = useNavigate();
    const [sTab, setSelectedTab] = useState('');
    const navToForm = (key) => {
        // Обновляем выбранную вкладку
        setSelectedTab(key);

        switch (sTab) {
            case '1':
                nav("/user");
                break;
            case '2':
                nav("/organization");
                break;
            case '3':
                nav("/role");
                break;
            case '4':
                nav("/new_point");
                break;
            case '5':
                nav("/accessibility_feature");
                break;
            default:
                return null;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={300} className="bg-gray-800 text-white">
                <Menu
                    mode="vertical"
                    selectedKeys={[selectedTab]}  // Убедись, что это значение обновляется при клике
                    onClick={({ key }) => navToForm(key)}  // Обработчик клика для обновления вкладки
                    theme="dark"
                >
                    <Menu.Item key="1" icon={<HomeOutlined />} className="hover:bg-blue-500">
                        Користувач
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />} className="hover:bg-blue-500">
                        Організація
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FileTextOutlined />} className="hover:bg-blue-500">
                        Роль
                    </Menu.Item>
                    <Menu.Item key="4" icon={<FileTextOutlined />} className="hover:bg-blue-500">
                        Нове місце
                    </Menu.Item>
                    <Menu.Item key="5" icon={<FileTextOutlined />} className="hover:bg-blue-500">
                        Критерій безбар'єрності
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
                        {elementToShow}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdmAppbar;
