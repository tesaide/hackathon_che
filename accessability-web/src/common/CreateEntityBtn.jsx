import { Button } from 'antd';
import { useNavigate } from 'react-router';

export function CreateEntityBtn({ redirectTo }) {
  const navigate = useNavigate();
  const handleOnClick = () => navigate(redirectTo);

  return (
    <div className="flex justify-end mb-2">
      <Button type="primary" onClick={handleOnClick}>Додати</Button>
    </div>
  );
}
