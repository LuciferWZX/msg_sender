import { ModelNamespace } from '@/models/type';
import StoreAction from '@/utils/StoreAction';

export interface IDB {
  name: string;
  version: number;
  db: null | any;
}
//数据库名称枚举
export enum DB {
  excel = 'excel',
}
export const openDB = (name: DB, version?: number) => {
  const request = window.indexedDB.open(name, version || 1);
  request.onerror = (event) => {
    //打开失败
    console.log(`数据库打开出错：${event}`);
  };
  request.onsuccess = (event) => {
    //打开成功
    const { result } = event.target as IDBOpenDBRequest;
    console.log(`数据库打开成功！`);
    console.log(result);
    StoreAction.updateModelState(ModelNamespace.database, { db: result }); //保存到modal
  };
  request.onupgradeneeded = function (event) {
    //升级版本号，修改数据库结构（新增或删除表、索引或者主键），只能通过升级数据库版本完成
    console.log('数据库版本更新为:' + version || 1);
  };
};
//关闭数据库
export const closeDB = (db: any) => {
  db.close();
};
