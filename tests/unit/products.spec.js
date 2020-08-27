import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Products from '@/components/Products.vue'
import sinon from 'sinon'
import dummyStore from './mocks/store'  //store falso para realizar las pruebas
import Vuex from 'vuex'

const localVue = createLocalVue()  //permite cargar los pluggins
localVue.use(Vuex)                 //carga pluggins vuex
const store = new Vuex.Store(dummyStore)  //Se genera el bstore basado 

describe('Products.vue', () => {
  it('Muestra el titulo "Nuestros Productos"', () => {
    const title = 'Nuestros Productos'
    const wrapper = shallowMount(Products, {})
    expect(wrapper.find("h1").text()).to.include(title)
  }),
  it('Muestra los productos', () => {
    const productName = 'Computadora'
    const wrapper = shallowMount(Products, {
      data ()
      {
        return {
          products: [{
            name: 'Computadora',
            price: 100.0,
            qty: 1,
        }]
      }
      }
    })
    expect(wrapper.text()).to.include(productName)
  }),
    
  it('Filtra los productos independiente de las mayúsculas y minúsculas', () => {
    const productSearch = 'computadora'
    const wrapper = shallowMount(Products, {})
    const searchBox = wrapper.find('input')
    wrapper.vm.products = [{
      name: 'Computadora',
      price: 100.0,
      qty: 1,
    }]
    searchBox.setValue('teclado') //productSearch
    expect(wrapper.text()).to.not.include(productSearch)
    searchBox.setValue(productSearch)
    expect(wrapper.text().toLowerCase()).to.include(productSearch)
  }),
    
  it('Añade los productos al carro', () => {
    const wrapper = shallowMount(Products, {})
    const clickMethodStub = sinon.stub()
    const product = {
      name: 'Computadora',
      price: 100.0,
      qty: 1,
    }
    wrapper.vm.products = [product]
    wrapper.setMethods({
      addToCart: clickMethodStub
    })
    const addButton = wrapper.find('.card .button')
    addButton.trigger('click')
    expect(clickMethodStub.calledWith((product))).to.equal(true)
  }),
    it('Añade los productos al store', () =>
    {
      const wrapper = shallowMount(Products, { localVue, store })
      const product = {
        name: 'Computadora',
        price: 100.0,
        qty: 1,
      }
      wrapper.vm.products = [product]
      const addToCartButton = wrapper.find('.card .button') //acción de la prueba
      addToCartButton.trigger('click')  // accionamos el botón
      expect(store.state.shoppingCart.list.length).to.equal(1)
      expect(store.state.shoppingCart.total).to.equal(100.0)
  })

})
