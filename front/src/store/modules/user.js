import userApi from '../../api/user'

// initial state
// shape: [{ id, quantity }]
const state = {
  user: null,
  token: null
}

// getters
const getters = {
  getUser: state => {
    return state.user;
  }
};

// actions
const actions = {
  login({ commit, state }, { email, password }){
    return new Promise(async (resolve, reject) => {
      try {
        const { data: { user, token } } = await userApi.login({ email, password });
        commit('setUser', user);
        commit('setToken', token);
        return resolve();
      } catch (err) {
        return reject(err.response.data.message);
      } 
    });
  },
  register({ commit }, data){
    return new Promise(async (resolve, reject) => {
      try {
        const { data: { user, token } } = await userApi.register(data);
        commit('setUser', user);
        commit('setToken', token);
        return resolve();
      } catch ({ response: { data: { message } } }) {
        return reject(message);
      }
    });
  },
  authenticate({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: { message } } = await userApi.authenticate(state.token);
        return resolve(message);
      } catch ({ response: { data: { message } } }) {
        return reject(message);
      }
    })
  }
}

// mutations
const mutations = {
  setUser(state, user){
    state.user = user;
  },
  setToken(state, token){
    state.token = token;
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