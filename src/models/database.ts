import { ModelNamespace } from '@/models/type';
import { ImmerReducer } from '@@/plugin-dva/connect';
import { DB } from '@/utils/dbUtils';

// export interface IDB {
//     name:DB,
//     version:number,
//     db:any|null
// }
export enum DBOpenState {
  failed,
  opening,
}
export interface DatabaseModelState {
  db: IDBDatabase | DBOpenState; //打开成功|正在打开|打开失败
  excelData: any[]; //导入的excel数据
}
export interface DatabaseModelType {
  namespace: ModelNamespace.database;
  state: DatabaseModelState;
  // 网络操作
  effects: {};
  // 本地操作
  reducers: {
    // 保存到state
    save: ImmerReducer<DatabaseModelState>;
    // 清除所有数据
    clear: ImmerReducer<DatabaseModelState>;
  };
}
const initState: DatabaseModelState = {
  db: DBOpenState.opening,
  excelData: [],
};
const databaseModel: DatabaseModelType = {
  namespace: ModelNamespace.database,
  state: initState,
  effects: {},
  reducers: {
    save(state: DatabaseModelState, { payload }: any) {
      Object.keys(payload).forEach((key) => {
        // @ts-expect-error
        state[key] = payload[key];
      });
    },
    clear(state: DatabaseModelState) {
      Object.keys(initState).forEach((key) => {
        // @ts-expect-error
        state[key] = initState[key];
      });
    },
  },
};
export default databaseModel;
