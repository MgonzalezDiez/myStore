import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login'
import sinon from 'sinon'
import { Auth } from '@/services/Auth'

describe('Login.vue', () => {
  it('Muestra error si Login falla', async () => {
    const login = {
        message: "Wrong User or Password",
        status: 401
    }
    sinon.stub(Auth, 'login').rejects(login)
    const wrapper = shallowMount(Login)
    wrapper.setData({
      credentials: {
        email: 'jose@gmail.com',
        password: '123456'
      }
    })
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).to.include('Usuario o Contraseña incorrectos, Intente nuevamente.')
  })
})