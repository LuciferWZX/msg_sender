import { FC } from 'react';
import styled from 'styled-components';
import { Avatar, Layout } from 'antd';


const Header:FC = () => {
  return(
    <HeaderBox>
     sss
    </HeaderBox>
  )
}
const HeaderBox = styled(Layout.Header)`
  height: 48px;
  line-height: 48px;
  padding: 0;
  top: 0;
  position: sticky;
`

export default Header
