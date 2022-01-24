import { Table } from 'antd';
import React, { FC } from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { TableViewBox } from './style';
import { useSelector } from 'umi';

const TableView: FC = () => {
  const db = useSelector((state) => state.database.db);
  const excelData = useSelector((state) => state.database.excelData);
  console.log(111, excelData);
  const columns: ColumnsType<any> = [
    {
      title: 'Full Name',
      //width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Age',
      //width: 100,
      dataIndex: 'age',
      key: 'age',
      fixed: 'left',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      render: () => <a>action</a>,
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 40,
      address: 'London Park',
    },
  ];
  return (
    <TableViewBox>
      <Table columns={[]} dataSource={[]} />
    </TableViewBox>
  );
};
export default TableView;
