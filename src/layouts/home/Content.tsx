import { FC } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';


const Content:FC = ({children}) => {
  return(
    <ContentBox>
      {children}
    </ContentBox>
  )
}
const ContentBox = styled(Layout.Content)`
  padding: 10px;
`
export default Content
