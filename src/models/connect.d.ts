import { LayoutModelState } from 'umi';
import layout from '@/models/layout';
import { DatabaseModelState } from '@/models/database';

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    layout?: boolean;
    database?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
  layout: LayoutModelState;
  database: DatabaseModelState;
}

declare module 'react-redux' {
  export function useSelector<TState = ConnectState, TSelected = unknown>(
    selector: (state: TState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean,
  ): TSelected;
}
