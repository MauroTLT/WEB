import Vue from 'vue'
import Router from 'vue-router'

import AppHome from './components/AppHome.vue'
import AppAbout from './components/AppAbout.vue'
import AddProdForm from './components/AddProdForm.vue'
import TablaProd from './components/TablaProd.vue'
import ProductShow from './components/ProductShow.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
	{
		path: '/',
		component: AppHome
	},{
		path: '/about',
		component: AppAbout
	},{
		path: '/products',
		component: TablaProd
	},{
		path: '/new',
		component: AddProdForm
	},{
		path: '/show/:id',
		component: ProductShow,
		props: true
	}
  ],
})