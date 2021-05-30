import {api} from '../api'

const state = {
    user: null,
    token: localStorage.getItem('token') || null,
    status: null,
};

const getters = {
    //isAuthenticated: (state) => !!state.user,
    StateUser: (state) => state.user,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
};

const actions = {
    async LogIn({commit}, user) {
        commit('auth_request')
        // await api.post("/prajapatidharmashala/api/account/login", user, {withCredentials: true});
        await api.post("/prajapatidharmashala/api/account/login", user)
          .then(res => {
            const token = res.data.token
            const user = res.data.mobile
            //alert(token)
            localStorage.setItem('token', token)
            api.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            //await commit("setUser", user.mobile);
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        //await commit("setUser", user.get("username"));
        
    },
    async LogOut({ commit }) {
        let user = null;
        localStorage.removeItem('token')
        delete api.defaults.headers.common['Authorization']
        //resolve()
        commit("logout", user);
      },
};

const mutations = {
  auth_request(state){
    state.status = 'loading'
  },
  auth_success(state, token, user){
    state.status = 'success'
    state.token = token
    state.user = user
  },
  auth_error(state){
    state.status = 'error'
  },
  // setUser(state, username) {
  //   state.user = username;
  // },
  logout(state, user) {
    state.user = user;
    state.status = null
    state.token = null
  },
};

export default {
    state,
    getters,
    actions,
    mutations,
  };