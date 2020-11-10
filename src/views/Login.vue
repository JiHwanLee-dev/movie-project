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
          
            <v-toolbar-title > 
                로그인
            </v-toolbar-title>
          <v-spacer/>

     </v-app-bar>

    <v-main>
        <v-container
        fluid
        
        >
          

        <v-row
            align="center"
            justify="center"
            
        >
            <v-col
                cols="12"
                sm="6"  
            >
                <v-text-field
                    outlined
                    dense   
                    label="아이디"
                >
                </v-text-field>

                <v-text-field
                    outlined
                    dense
                    label="비밀번호"
                >
                </v-text-field>

                <v-checkbox
                   label="아이디 저장"
                >
                </v-checkbox>

                <v-btn
                    block
                    color="primary"
                >
                    로그인
                </v-btn>

                

                
            </v-col>
        </v-row>

        <v-row
            align="center"
            justify="center"
        >

            <v-btn
                text
            >
                ID/PW 찾기
            </v-btn>

            |

            <v-btn
                text
                @click="btnJoin"
            >
                 회원가입
            </v-btn>

            |

             <v-btn
                text
            >
                 비회원 예매확인
            </v-btn>

           
        </v-row>

       
        
      </v-container>
    </v-main>
 </v-app>
</template>

<script>
//import Join from "@/views/Join.vue";
export default {
    data() {
        return {
            tab: null,

        }
    },

    methods: {
       btnBack(){
           this.$router.push({
               name: "Main"
           })
       },

       btnJoin(){
           this.$router.push({
               name: "Join"
           })
       },

    },

    created(){
        console.log('Login_created()')
    }
}
</script>

<style>

</style>