import { Button, Input, Space, Tag, Tooltip } from 'antd';
import React, { ChangeEvent, FC, memo, useEffect, useState } from 'react';
import {
  ActionBox,
  BaseTableWithDarkTheme,
  SearchBox,
  TableBox,
  TableViewBox,
} from './style';
import { useSelector } from 'umi';
import cx from 'classnames';
import Highlighter from 'react-highlight-words';
import { useDebounceFn, useMemoizedFn, useSize, useUpdateEffect } from 'ahooks';
import { ArtColumn, features, useTablePipeline } from 'ali-react-table';
import {
  MinusCircleOutlined,
  SearchOutlined,
  SendOutlined,
} from '@ant-design/icons';
import PinyinMatch from 'pinyin-match';
const TableView: FC = () => {
  const db = useSelector((state) => state.database.db);
  const excelData = useSelector((state) => state.database.excelData);
  const [columns, setColumns] = useState<ArtColumn[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const size = useSize(document.getElementById('table-view'));

  const { run } = useDebounceFn(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    {
      wait: 500,
    },
  );
  //表格的配置
  const pipeline = useTablePipeline()
    .input({ dataSource: dataSource, columns })
    .use(
      features.columnResize({
        //fallbackSize: 120,
        //handleBackground: '#ddd',
        handleHoverBackground: 'rgba(0, 168, 255,0.2)',
        handleActiveBackground: '#89bff7',
      }),
    )
    .use(features.columnRangeHover())
    .use(
      features.sort({
        mode: 'multiple',
        highlightColumnWhenActive: true,
        clickArea: 'icon',
      }),
    );
  const renderSearchWords = (
    text: string,
    result: [number, number],
  ): string => {
    return text.substring(result[0], result[1] + 1);
  };
  useEffect(() => {
    fetchColumnsData();
    fetchDataSource();
  }, [excelData]);
  useUpdateEffect(() => {
    fetchDataSource();
  }, [keyword]);
  //渲染列
  const fetchColumnsData = useMemoizedFn(() => {
    if (excelData.length > 0) {
      const titles = Object.keys(excelData[0]).concat('actions');
      setColumns(
        titles.map((item, index) => {
          if (item === 'actions') {
            return {
              code: item,
              name: '操作',
              lock: true,
              getValue(_) {
                return (
                  <ActionBox>
                    <Space>
                      <Tooltip title={'发送短信'}>
                        <SendOutlined className={'action-icon'} />
                      </Tooltip>
                      <Tag icon={<MinusCircleOutlined />} color="default">
                        未发送
                      </Tag>
                    </Space>
                  </ActionBox>
                );
              },
            };
          }
          return {
            code: item,
            name: item,
            features: { sortable: true },
          };
        }),
      );
    }
  });
  //渲染数据
  const fetchDataSource = useMemoizedFn(() => {
    setDataSource(
      excelData.filter((item) => {
        if (keyword === '') {
          return true;
        }
        let isPass = false;
        const values: any[] = Object.values(item);
        for (let i = 0; i < values.length; i++) {
          if (values[i]) {
            const result: boolean | [number, number] = PinyinMatch.match(
              values[i].toString().toUpperCase(),
              keyword,
            );
            if (result) {
              isPass = true;
            }
          }
        }
        return isPass;
      }),
    );
  });
  //设置过滤的关键字
  const changeWord = (e: ChangeEvent<HTMLInputElement>) => {
    run(e);
  };
  return (
    <TableViewBox>
      <SearchBox>
        <Space>
          <Input
            allowClear={true}
            onChange={changeWord}
            size={'small'}
            placeholder={'请输入'}
            suffix={<SearchOutlined />}
          />
        </Space>
      </SearchBox>
      <TableBox id={'table-view'}>
        <BaseTableWithDarkTheme
          {...pipeline.getProps()}
          style={{
            height: size?.height || 300,
            overflow: 'auto',
          }}
          useVirtual={true}
          className={cx({ dark: true })}
          components={{
            Cell: ({ row, rowIndex, column, colIndex, tdProps }: any) => {
              // row 单元格的行数据
              // rowIndex 单元格的行下标
              // column 单元格的列配置
              // colIndex 单元格的列下标
              // tdProps <td> 元素的 props
              const item = (tdProps as any).children;
              const result: any | [number, number] = PinyinMatch.match(
                item.toString(),
                keyword,
              );
              if (result === false) {
                return <td {...tdProps} />;
              }
              return (
                <td
                  {...tdProps}
                  children={
                    <Highlighter
                      highlightClassName="highlight-class"
                      searchWords={[renderSearchWords(item.toString(), result)]}
                      autoEscape={true}
                      textToHighlight={item.toString()}
                    />
                  }
                />
              );
            },
          }}
          getRowProps={() => {
            return {
              className: 'row-class',
            };
          }}
        />
      </TableBox>
    </TableViewBox>
  );
};
export default memo(TableView);
