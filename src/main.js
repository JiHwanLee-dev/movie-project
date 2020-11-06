import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import header from "./components/Header";
import materialIcon from 'material-design-icons-iconfont';


// 전역 등록
Vue.component('Header', header);

Vue.config.productionTip = false;

Vue.use(materialIcon);

//window.Kakao.init("c2553c5b551930f699726f5f22c99b09");

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
