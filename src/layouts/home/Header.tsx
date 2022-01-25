import { FC } from 'react';
import styled from 'styled-components';
import { Layout, Space } from 'antd';
import { useSelector } from 'umi';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useMemoizedFn } from 'ahooks';
import StoreAction from '@/utils/StoreAction';
import { ModelNamespace } from '@/models/type';

const Header: FC = () => {
  const isScrolling = useSelector(
    (state) => state.layout.isScrolling,
    (left, right) => left === right,
  );
  const setIsScrolling = useMemoizedFn((visible: boolean) => {
    StoreAction.updateModelState(ModelNamespace.layout, {
      isScrolling: visible,
    });
  });
  return (
    <HeaderBox>
      <Space>
        {isScrolling ? (
          <MenuUnfoldOutlined
            className="scrolling-icon"
            onClick={() => setIsScrolling(false)}
          />
        ) : (
          <MenuFoldOutlined
            className="scrolling-icon"
            onClick={() => setIsScrolling(true)}
          />
        )}
      </Space>
    </HeaderBox>
  );
};
const HeaderBox = styled(Layout.Header)`
  height: 48px;
  line-height: 48px;
  padding: 0;

  .scrolling-icon {
    :hover {
      color: #096dd9;
    }
  }
`;

export default Header;
