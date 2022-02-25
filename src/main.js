// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import { initRouter } from '@/libs/router-util' // (1) the introduction of new dynamic menu rendering
import 'xterm/dist/xterm.css'
// Actual packaging should not introduce the mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(TreeTable)
Vue.use(VOrgTree)
/**
 * @description The registered admin plug-ins
 */
installPlugin(Vue)
/**
 * @description Turn off the prompt production environment
 */
Vue.config.productionTip = false
/**
 * @description Global registration application configuration
 */
Vue.prototype.$config = config
/**
 * Registration instructions
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App),
  mounted() {
    initRouter() // (1) the new method is called, dynamically generated routing,
  }
})
