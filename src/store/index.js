import Vue from "vue";
import Vuex from "vuex";
import PersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    PersistedState()
  ],
  state: {
    seat : [
      
    ],
    userInfo: null,
    isLogin: false,
    isLoginError: false,

  },
  mutations: {
    // 로그인이 성공했을 때
    loginSuccess(state, payload){   // payload : actions에서 로그인 성공 시 , 해당 유저의 정보를 담고있는 변수
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload
    },
  },
  actions: {},
  modules: {}
});
