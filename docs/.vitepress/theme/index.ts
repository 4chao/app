import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';

import Demo from '../components/v-demo.vue';
import '../styles/app.scss';

import D4C from '@D4C/index';
import '@D4C/theme-default/index.scss';

export default <Theme>{
  ...DefaultTheme,
  enhanceApp({ app }) {
    // register global components
    app.use(D4C);
    app.component('Demo', Demo);
  },
};
