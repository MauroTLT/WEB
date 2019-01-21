import Vue from 'vue'
import Router from 'vue-router'

import AppHome from './components/AppHome.vue'
import AppAbout from './components/AppAbout.vue'

import TablaGrup from './components/TablaGrup.vue'
import TablaAlumnos from './components/TablaAlumnos.vue'
import TablaProfes from './components/TablaProfes.vue'
import AddGrupForm from './components/AddGrupForm.vue'

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
		path: '/grupos',
		component: TablaGrup
	},{
		path: '/grupos/new',
		component: AddGrupForm,
	},{
		path: '/grupos/edit/:id',
		component: AddGrupForm,
		props: true
	},{
		path: '/alumnos',
		component: TablaAlumnos
	},{
		path: '/alumnos/grupo/:grupo',
		component: TablaAlumnos,
		props: true
	},{
		path: '/profesores',
		component: TablaProfes
	},{
		path: '/profesores/:prof',
		component: TablaProfes,
		props: true
	},{
		path: '/profesores/grupo/:grupo',
		component: TablaProfes,
		props: true
	}
  ],
})