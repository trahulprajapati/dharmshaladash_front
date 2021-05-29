import {api} from '../api'

const state = {
    user: null,
    posts: null,
};

const getters = {
    isAuthenticated: (state) => !!state.user,
    StateUser: (state) => state.user,
};

const actions = {
    async LogIn({commit}, user) {
        await api.post("/prajapatidharmashala/api/account/login", user, {withCredentials: true});
        await commit("setUser", user.get("username"));
    },
    async LogOut({ commit }) {
        let user = null;
        commit("logout", user);
      },
};

const mutations = {
    setUser(state, username) {
      state.user = username;
    },
    logout(state, user) {
      state.user = user;
    },
  };

export default {
    state,
    getters,
    actions,
    mutations,
  };