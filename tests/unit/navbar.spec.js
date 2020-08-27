import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'

import Navbar from '@/components/Navbar.vue'
import Vuex from "vuex"
import dummyStore from './mocks/store'

import VueRouter from 'vue-router'
import dummyRoutes from "./mocks/routes"

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)

const store = new Vuex.Store(dummyStore)
const router = new VueRouter(dummyRoutes)

describe('Navbar.vue', () => {
  it('muestra menu de login si el usuario  no ha iniciado sesión', () => {
    const wrapper = mount(Navbar, {
      propsData: {
        title: "Mi Tienda"
      },
      localVue,
      store,
      router,
    })
    store.dispatch('updateUser', undefined)
    expect(wrapper.text()).to.include('Login')
  }),
  it('muestra menu de usuario si está logueado', () => {
    //Arrange
    const wrapper = mount(Navbar, {
      propsData: {
        title: "Mi Tienda"
      },
      localVue,
      store,
      router,
    })
    //Act
    store.dispatch('updateUser', { email: 'user@mystore.com' })
    //Asserts
    expect(wrapper.text()).to.include('Usuario')
    expect(wrapper.text()).to.not.include('Login')
  })
})