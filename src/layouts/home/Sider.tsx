import { FC } from 'react';
import styled from 'styled-components';
import { Avatar, Layout, Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { useLocation,history  } from 'umi';
import { useMemoizedFn } from 'ahooks';
import { MenuInfo } from 'rc-menu/lib/interface';

const { SubMenu } = Menu;
const Sider:FC = () => {
  const location = useLocation();
  const clickMenu = useMemoizedFn((e:MenuInfo)=>{
    const {key}=e
    if(key !== location.pathname){
      history.push(key);
    }
  })

  return(
    <SiderBox>
      <UserAvatar>
        <Avatar style={{backgroundColor:'#1890ff'}} src={require('/public/assets/svg/avatar.svg')} />
      </UserAvatar>
      <MenuBox
        activeKey={location.pathname}
        onClick={clickMenu}
        defaultOpenKeys={["info-management"]}
        mode={'inline'}>
        <SubMenu key="info-management" icon={<AppstoreOutlined />} title="信息管理">
          <Menu.Item key="/home/info">数据列表</Menu.Item>
          <Menu.Item key="/home/template">信息模板</Menu.Item>
        </SubMenu>
      </MenuBox>
    </SiderBox>
  )
}
const SiderBox = styled(Layout.Sider)`
  height: 100vh;
  top: 0;
  position: sticky;
  user-select: none;
`
const UserAvatar = styled.div`
  height: 48px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-left: 10px;
`
const MenuBox = styled(Menu)`
`
export default Sider
