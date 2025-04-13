import { Modal } from 'antd';

export function ConfirmDeleteModal({ open, onConfirm, onCancel }) {
  return (
    <Modal
      title="Ви впевнені, що хочете видалити цей запис?"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      centered
      okText="Так"
      okType="danger"
      cancelText="Відміна"
    />
  );
}
