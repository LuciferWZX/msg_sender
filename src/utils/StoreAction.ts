import { getDvaApp } from 'umi';
import { ConnectState } from '@/models/connect';
import { ModelNamespace } from '@/models/type';

class StoreAction {
  updateModelState = (name: ModelNamespace, data: any) => {
    const { dispatch } = getDvaApp()._store;
    dispatch({
      type: `${name}/save`,
      payload: data,
    });
    //const state:ConnectState = getDvaApp()._store.getState()
  };
}
export default new StoreAction();
