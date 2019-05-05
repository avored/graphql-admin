import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/css/common.css'
import i18n from '@/plugins/i18n';

import LoginLayout from "@/layouts/Login";
import AppLayout from "@/layouts/App";

Vue.config.productionTip = false
Vue.use(Antd)

Vue.component('app-layout', AppLayout);
Vue.component('login-layout', LoginLayout);

new Vue({
  i18n,
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
