import { cleanup, fireEvent, render } from '@testing-library/react';
import AddUserModal from './AddUserModal';

describe('AddUserModal', () => {
  afterEach(cleanup);

  it('modal is render', () => {
    const onCancelMock = jest.fn();
    const mockOnOk = jest.fn();

    const { getByText } = render(
      <AddUserModal visible={true} onCancel={onCancelMock} onOk={mockOnOk} />,
    );

    // 弹窗是否渲染
    expect(getByText('新增用户')).toBeInTheDocument();

    // 取消逻辑是否调用
    fireEvent.click(getByText('取消'));
    expect(onCancelMock).toHaveBeenCalled();

    // 表单提交数据
    fireEvent.change(getByText('姓名').nextElementSibling, {
      target: { value: 'HAHA' },
    });
    fireEvent.change(getByText('主管').nextElementSibling, {
      target: { value: 'HIHI' },
    });
    fireEvent.click(getByText('权限').nextElementSibling, {
      target: { value: 'pm' },
    });

    fireEvent.click(getByText('确定'));

    const mockData = {
      name: 'HAHA',
      departmaent: 'HIHI',
      roles: ['pm'],
    };

    expect(mockOnOk).toHaveBeenCalledWith(mockData);
  });
});
