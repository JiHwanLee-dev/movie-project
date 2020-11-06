import Vue from "vue";
import Vuetify from "vuetify/lib";
import KakaoIcon from "@/components/icons/KakaoIcon";
//import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css';


Vue.use(Vuetify);

export default new Vuetify({
    theme : {},
    icons : {
        iconfont: 'mdi',
        values : {
            kakaoIcon : {
                component: KakaoIcon,
            },
            video: 'mdi-kitchen'
        },
      
    }
});
