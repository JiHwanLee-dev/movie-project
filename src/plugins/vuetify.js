import Vue from "vue";
import Vuetify from "vuetify/lib";
import KakaoIcon from "@/components/icons/KakaoIcon";
import Arrow_Back from "@/components/icons/Arrow_Back"
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
            arrow_Back : {
                component: Arrow_Back
            },
            video: 'mdi-kitchen'
        },
      
    }
});
