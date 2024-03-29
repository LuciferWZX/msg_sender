import { BaseTable } from 'ali-react-table';
import styled from 'styled-components';

export const InfoViewBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  .ant-upload.ant-upload-drag .ant-upload {
    padding: 0;
  }
`;
export const TableViewBox = styled.div`
  margin-top: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .row-class {
    word-break: break-word;
  }
`;
export const BaseTableWithDarkTheme = styled(BaseTable)`
  &.dark {
    --bgcolor: #333;
    --header-bgcolor: #45494f;
    --hover-bgcolor: #46484a;
    --header-hover-bgcolor: #606164;
    --highlight-bgcolor: #191a1b;
    --header-highlight-bgcolor: #191a1b;
    --color: #dadde1;
    --header-color: #dadde1;
    --lock-shadow: rgb(37 37 37 / 0.5) 0 0 6px 2px;
    --border-color: #3c4045;
  }
`;
export const SearchBox = styled.div``;
export const TableBox = styled.div`
  flex: 1;
  overflow: hidden;
  height: 100%;
  margin-top: 10px;
`;
export const ActionBox = styled.div`
  .action-icon {
    :hover {
      color: #0984e3;
      cursor: pointer;
    }
  }
`;
