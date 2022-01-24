import { defineConfig } from 'umi';
import { light, routes } from './config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme:light,
  history: { type: 'hash' },
  routes:routes,
  fastRefresh: {},
});
