import Vue from 'vue'
import Vuex from 'vuex'
import { api } from "@/services.js";

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    usuario: {
      id: '',
      nome: '',
      email: '',
      password: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: ''
    },
    usuario_produtos: null
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload)
    },
    UPDATE_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos = payload
    },
    ADD_USUARIO_PRODUTOS(state, payload) {
      state.usuario_produtos.unshift(payload)
    }
  },
  actions: {
    getUsuarioProdutos(context) {
      return api.get(`/products`)
        .then(response => {
          context.commit("UPDATE_USUARIO_PRODUTOS", response.data.data)
        })
    },
    getUsuario(context) {
      return api.get(`/users`)
        .then(response => {
          context.commit('UPDATE_USUARIO', response.data)
          context.commit('UPDATE_LOGIN', true)
        })
    },
    criarUsuario(context, payload) {
      return api.post("/users", payload)
    },
    logarUsuario(context, payload) {
      return api.login({
        email: payload.email,
        password: payload.password
      })
        .then(response => {
          window.localStorage.token = `Bearer ${response.data.access_token}`
        })
    },
    deslogarUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        id: '',
        nome: '',
        email: '',
        password: '',
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
      })
      window.localStorage.removeItem("token")
      context.commit("UPDATE_LOGIN", false)
    }
  }
})
