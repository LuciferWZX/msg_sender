import { useMount } from 'ahooks';
import { FC, Fragment } from 'react';
import { DB, openDB } from '@/utils/dbUtils';

const DatabaseWrapper: FC = ({ children }) => {
  useMount(() => {
    openDB(DB.excel);
  });
  return <Fragment>{children}</Fragment>;
};
export default DatabaseWrapper;
