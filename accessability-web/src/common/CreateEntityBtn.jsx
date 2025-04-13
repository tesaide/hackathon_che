import { Button } from 'antd';
import { useNavigate } from 'react-router';
import { PlusCircleOutlined } from '@ant-design/icons';

export function CreateEntityBtn({ redirectTo }) {
  const navigate = useNavigate();
  const handleOnClick = () => navigate(redirectTo);

  return (
    <div className="flex justify-end mb-2">
      <Button type="primary" icon={<PlusCircleOutlined />} onClick={handleOnClick}>Додати</Button>
    </div>
  );
}
