import { defineConfig } from 'umi';
import { light, routes } from './config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  theme: light,
  antd: {
    dark: true,
  },
  dva: {
    immer: true,
  },

  history: { type: 'hash' },
  routes: routes,
  fastRefresh: {},
});
