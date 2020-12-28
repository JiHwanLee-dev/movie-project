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
                    v-model="user.id"
                    outlined
                    dense   
                    label="아이디"
                >
                </v-text-field>

                <v-text-field
                    v-model="user.passwd"
                    type="password"
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
                    @click="btnLogin"
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
import axios from 'axios'
export default {
    data() {
        return {
            tab: null,
            user: {
                id : null,
                passwd: null,
            }

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
        
       btnLogin() {
           
            console.log('this.user : ', this.user);

            const jsonData = JSON.stringify(this.user);
            //var jsonData = "aaaa";
            
            axios({
                url: "http://localhost:3000/loginProcess",
                method: "post",
                data: jsonData,
                headers: {
                    'content-type': 'application/json',            
                }
            
            }).then(res => {
                console.log('loginResult : ', res);

                // 아이디나 비밀번호가 틀림.
                if(res.data.result == 'false'){
                    alert('아이디나 비밀번호가 틀렸습니다. ')
                }else{
                        
                    this.$store.commit('loginSuccess', this.user.id)   // store.index.js 파일의 mutations의 loginSuccess함수 호출 , 두번째 인자는 loginSuccess함수에 전달하는 값            
                    this.$router.push({
                        name : 'Main'
                    })
                }
            })
       }

    },

    created(){
        console.log('Login_created()')
    }
}
</script>

<style>

</style>