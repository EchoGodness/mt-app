const home = {
  state: {
    menu: []
  },
  mutations: {
    SET_MENU(state, val) {
      state.menu = val
    }
  },
  actions: {
    async nuxtServerInit({ commit }, { req, app }) {
      let { status: menuStatus, data: { menu } } = await app.$axios.get(`/geo/menu`);
      commit('SET_MENU', menuStatus === 200 ? menu : [])
    },

  }
}
export default home
