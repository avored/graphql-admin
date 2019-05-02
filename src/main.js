import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import LoginLayout from "@/layouts/Login";
import AppLayout from "@/layouts/App";

Vue.config.productionTip = false
Vue.use(Antd)

Vue.component('app-layout', AppLayout);
Vue.component('login-layout', LoginLayout);

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
