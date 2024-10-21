import { RoleEnum } from '@/constants';
import { Form, Input, Modal, Select } from 'antd';
import { useMemo } from 'react';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onOk: (res: API.UserInfoVO) => void;
}

const AddUserModal = ({
  visible,
  onCancel = () => {},
  onOk = () => {},
}: Props) => {
  const [form] = Form.useForm();

  const RoleOptions = useMemo(
    () =>
      Object.keys(RoleEnum).map((item) => {
        return {
          label: RoleEnum[item],
          value: item,
        };
      }),
    [],
  );

  const handleSubmit = () => {
    form
      .validateFields()
      .then((res) => {
        onOk(res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  return (
    <Modal
      title="新增用户"
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form
        form={form}
        name="addUserForm"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600, marginTop: '20px' }}
        autoComplete="off"
      >
        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="主管"
          name="departmaent"
          rules={[{ required: true, message: '请输入主管' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="权限"
          name="roles"
          rules={[{ required: true, message: '请选择权限' }]}
        >
          <Select mode="multiple" options={RoleOptions}></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
