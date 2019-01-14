import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './index'
import VeeValidate, {Validator} from 'vee-validate'
import es from 'vee-validate/dist/locale/es'

let Veeconfig = {
  locale: 'es_ES',
  events: 'blur'
};

const dictionary = {
  es: {
    messages:{
      required: (field) => 'El campo '+field+' es obligatorio',
      min: (field, args) => 'El campo '+field+' debe contener al menos '+args[0]+' caracteres',
      max: (field, args) => 'El campo '+field+' no debe ser mayor de '+args[0]+' caracteres',
      min_value : (field, args) => 'El campo '+field+' debe ser '+args[0]+' o superior',
    }
  },
  ca: {
    messages: {
      required: (field) => 'El camp '+field+' és obligatori',
      min: (field, args) => 'El camp '+field+' ha de tindre al menys '+args[0]+' caracteres',
      max: (field, args) => 'El camp '+field+' no ha de tindre mes de '+args[0]+' caracteres',
      min_value : (field, args) => 'El camp '+field+' ha de ser '+args[0]+' o superior',
    }
  }
};

Validator.localize({ es_ES: es});
Validator.localize(dictionary);

Vue.use(VeeValidate, Veeconfig)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
