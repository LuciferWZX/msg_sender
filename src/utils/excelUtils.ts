import * as XLSX from 'xlsx';
import StoreAction from '@/utils/StoreAction';
import { ModelNamespace } from '@/models/type';
export const parseExcel = (file: File) => {
  let fileName = file.name;
  // 获取文件后缀
  let suffix = fileName.substr(fileName.lastIndexOf('.')).trim();
  console.log('suffix:', suffix === '.xlsx');
  if (suffix === '.xlsx') {
    //专门处理xlsx后缀
    const reader = new FileReader();
    console.log(45, reader);
    reader.onload = (event) => {
      console.log(222, event.target);
      try {
        const { result } = event.target as FileReader;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary' });
        console.log(111, workbook);
        let data: any[] = [];
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            data = data.concat(
              XLSX.utils.sheet_to_json(workbook.Sheets[sheet]),
            );
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        StoreAction.updateModelState(ModelNamespace.database, {
          excelData: data,
        }); //保存到modal
      } catch (e) {
        console.log('解析excel出错');
        console.log(e);
      }
    };
    // 以二进制方式打开文件
    reader.readAsBinaryString(file);
  }
  console.log('suffix:', suffix);
};
