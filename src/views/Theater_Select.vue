<template>
  <v-app>
    <v-app-bar 
        app
        flat
        color="white"
    >

        <v-btn
            icon
            @click="btnBack"
        >      
            <v-icon
            >
                $vuetify.icons.arrow_Back
            </v-icon>
        </v-btn>
          <v-spacer/>
            <v-toolbar-title> 
               극장선택
            </v-toolbar-title>
          <v-spacer/>

     </v-app-bar>

    <v-main>
        <v-container
        fluid 
        >
        <selectComponent @test="printText"/>
        
      </v-container>
    </v-main>
    <v-footer class="footer">
        <v-btn block :disabled="disabled" color="primary"> 선택하기 </v-btn>
    </v-footer>
 </v-app>
</template>

<script>
 /*eslint-disable */
import selectComponent from '@/components/theater_select/select-component.vue';
//import axios from 'axios'

export default {
    components: {
        selectComponent
    },

    data() {
        return {
            disabled: true,
        }
    },

    methods : {
        btnBack() {

        },

        printText(message){
            //alert(JSON.stringify(message))
            
            // 클릭됨
            if(message.theater != ''){
                this.disabled= false;
            }else{
                this.disabled= true;
            }
            
        }
    },

    created(){
        //console.log(this.show-log)
    }
}
</script>

<style scoped>
    /* 버튼 하단에 고정 */
    .footer{
        position: fixed;
        left:0px; 
        bottom:0px; 
        height:60px; 
        width:100%;
        background: white;
        
    }
</style>