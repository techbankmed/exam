import { RoleEnum } from '@/constants';
import {
  addUser,
  deleteUser,
  modifyUser,
  queryUserList,
} from '@/services/demo/UserController';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import AddUserModal from '../AddUserModal';

// 脚手架示例组件
const Guide: React.FC = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);

  const tableRef = useRef<ActionType>();

  const columns: ProColumns<API.UserInfo, 'text'>[] = [
    {
      title: '工号',
      dataIndex: 'id',
      editable: false,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '主管',
      dataIndex: 'departmaent',
    },
    {
      title: '权限',
      dataIndex: 'roles',
      valueEnum: RoleEnum,
      fieldProps: {
        mode: 'multiple',
        multiple: true,
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, index, action) => {
        return [
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];

  const handleAddUser = async (values: API.UserInfoVO) => {
    const res = await addUser(values);
    if (res.success) {
      tableRef.current?.reload();
      setAddModalVisible(false);
    }
  };


  return (
    <div>
      <ProTable
        search={{
          defaultCollapsed: false,
        }}
        pagination={{
          defaultPageSize: 10,
          pageSizeOptions: ['10', '20', '30'],
          showSizeChanger: true,
        }}
        editable={{
          onDelete: async (rowKey, row) => {
            const res = await deleteUser({ userId: row.id });
            if (res.success) {
              return true;
            }
          },
          onSave: async (rowKey, row) => {
            const res = await modifyUser(row);
            if (res.success) {
              return true;
            }
          },
        }}
        rowKey={'id'}
        actionRef={tableRef}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => setAddModalVisible(true)}
          >
            新增用户
          </Button>,
        ]}
        columns={columns}
        request={async (params) => {
          delete params.current;
          delete params.pageSize;

          if (params.id) {
            params.id = +params.id;
          }
          const res = await queryUserList({ ...params });
          return {
            data: res.data?.list,
            success: res.success,
            total: res.data?.list?.length,
          };
        }}
      ></ProTable>

      <AddUserModal
        visible={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        onOk={handleAddUser}
      ></AddUserModal>
    </div>
  );
};

export default Guide;
