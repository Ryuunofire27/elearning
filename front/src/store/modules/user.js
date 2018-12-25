import userApi from '../../api/user'

// initial state
// shape: [{ id, quantity }]
const state = {
  user: null
}

// getters
const getters = {};

// actions
const actions = {}

// mutations
const mutations = {
  login(state){
    state.user = { name: 'Carlos' };
    console.log(state.user.name)
    return state.user;
  },
  logout(state){
    state.user = null;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}