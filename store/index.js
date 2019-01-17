import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import getters from './getters'
import home from './modules/home'

Vue.use(Vuex)
// 创建vuex实例：
const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  getters
})

export default store
