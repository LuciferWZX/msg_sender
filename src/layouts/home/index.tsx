import { FC } from 'react';
import { InnerLayout, LayoutBox } from '@/layouts/home/style';
import Sider from '@/layouts/home/Sider';
import Header from '@/layouts/home/Header';
import Content from '@/layouts/home/Content';

const HomeLayout:FC = ({children}) => {
  return(
    <LayoutBox>
      <Sider />
      <InnerLayout>
        <Header/>
        <Content>
          {children}
        </Content>
      </InnerLayout>
    </LayoutBox>
  )
}
export default HomeLayout
