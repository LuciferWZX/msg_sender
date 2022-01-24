import React, { FC } from 'react';
import { Alert, Button, Upload } from 'antd';
import { useSelector } from 'umi';
import { DBOpenState } from '@/models/database';
import { LoadingOutlined } from '@ant-design/icons';
import { useMemoizedFn } from 'ahooks';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { parseExcel } from '@/utils/excelUtils';
const { Dragger } = Upload;
const Header: FC = () => {
  const db = useSelector((state) => state.database.db);

  const changeFile = useMemoizedFn((info: UploadChangeParam) => {
    const { fileList } = info;
    const originalFile = fileList?.[0].originFileObj;
    if (originalFile) {
      //开始解析Excel；
      parseExcel(originalFile);
    }
  });
  //正在打开
  if (db === DBOpenState.opening) {
    return (
      <Alert
        message={'正在打开数据库,请稍等...'}
        type="info"
        showIcon
        icon={<LoadingOutlined />}
      />
    );
  }
  //打开失败
  if (db === DBOpenState.failed) {
    return (
      <Alert
        message={'数据库打开失败'}
        type="error"
        showIcon
        action={
          <Button size="small" type="link">
            导入
          </Button>
        }
      />
    );
  }
  return (
    <Alert
      message={'数据库打开成功'}
      type="success"
      showIcon
      action={
        <Dragger
          name={'employees-excel'}
          multiple={false}
          accept={'.xlsx'}
          beforeUpload={() => false}
          onChange={changeFile}
          showUploadList={false}
          maxCount={1}
        >
          <Button size="small" type="link">
            导入Excel
          </Button>
        </Dragger>
      }
    />
  );
};
export default Header;
