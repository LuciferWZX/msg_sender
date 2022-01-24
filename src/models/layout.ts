import { Effect, ImmerReducer } from 'umi';
import { ModelNamespace } from '@/models/type';

export interface LayoutModelState {
  isScrolling: boolean; //是否收起
}
export interface LayoutModelType {
  // 命名空间
  namespace: ModelNamespace.layout;
  // 模块状态
  state: LayoutModelState;
  // 网络操作
  effects: {};
  // 本地操作
  reducers: {
    // 保存到state
    save: ImmerReducer<LayoutModelState>;
    // 清除所有数据
    clear: ImmerReducer<LayoutModelState>;
  };
}
const initState: LayoutModelState = {
  isScrolling: false,
};
const LayoutModel: LayoutModelType = {
  namespace: ModelNamespace.layout,
  state: initState,
  effects: {},
  reducers: {
    save(state: LayoutModelState, { payload }: any) {
      Object.keys(payload).forEach((key) => {
        // @ts-expect-error
        state[key] = payload[key];
      });
    },
    clear(state: LayoutModelState) {
      Object.keys(initState).forEach((key) => {
        // @ts-expect-error
        state[key] = initState[key];
      });
    },
  },
};
export default LayoutModel;
