import React, { FC } from 'react';
import { InfoViewBox } from '@/pages/info/style';
import Header from '@/pages/info/Header';
import TableView from '@/pages/info/TableView';

const InfoView: FC = () => {
  return (
    <InfoViewBox>
      <Header />
      <TableView />
    </InfoViewBox>
  );
};
export default InfoView;
