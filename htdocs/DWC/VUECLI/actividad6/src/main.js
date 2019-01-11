import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './index'
import VeeValidate, {Validator} from 'vee-validate'
import es from 'vee-validate/dist/locale/es'

const Veeconfig = {
  locale: 'es_ES',
  events: 'blur'
};

Validator.localize({ es_ES: es});

Vue.use(VeeValidate, Veeconfig)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
