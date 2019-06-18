import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import VeeValidate, {Validator} from 'vee-validate'
import es from "vee-validate/dist/locale/es";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(VeeValidate)
Validator.localize('es', es)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')