<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      
    >
      <v-list-item
        class="top-list-item"
    
      >
        <v-list-item-content>
          <v-list-item-title 
            class="title"
            >

            <v-btn
              class="ma-2"
              outlined
              large
              fab
              color="white"
              @click="btnHome"
            >
              <v-icon>mdi-home</v-icon>
            </v-btn>
            
          </v-list-item-title>
          <v-list-item-subtitle
            class="subtitle"
            >

            <v-btn
              rounded
              class="ma-2"
              outlined
              color="white"
              @click="btnLogin"
            >
              
                로그인
            </v-btn>

          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

       <v-divider></v-divider>

       <v-list
        dense
        nav
       >


                <!-- style="background-color: blue;
                 justify-content: center;
                 align-content: center;
                 align-items: center;
                 border: 4px solid white;" -->

       <v-list-item
         dense
         class="top-list-items"
      >
        <v-list-item-content
          @click="btnMovieReser"
        >

          <v-list-item-title   
            class="titles"
          >
            <v-row
              align="center"
              justify="center"
            >
                    <v-btn
                      class="ma-2"
                      outlined
                      large
                      fab
                      color="black"
                    >
                      <v-icon>mdi-home</v-icon>
                    </v-btn>
            </v-row>                      
          </v-list-item-title>

          <v-list-item-subtitle
            class="subtitles"
            >
              <v-row
                justify="center"
              >
                
                   영화별 예매
              </v-row>

          </v-list-item-subtitle>
         
        </v-list-item-content>


        <v-list-item-content        
        >
          <v-list-item-title 
             
          
            class="titles"
            >

            <v-row
              align="center"
              justify="center"
            >
                    <v-btn
                      class="ma-2"
                      outlined
                      large
                      fab
                      color="black"
                    >
                      <v-icon>mdi-home</v-icon>
                    </v-btn>
            </v-row>

      
            
            
          </v-list-item-title>
           <v-list-item-subtitle
            class="subtitles"
            >
              <v-row
                justify="center"
              >
                
                   극장별 예매
              </v-row>
               
           

          </v-list-item-subtitle>
         
        </v-list-item-content>

    

      </v-list-item>

      <v-divider></v-divider>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
                {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
   
        </v-list-item>

         <v-divider></v-divider>

        <v-list-item
    
        >

        
          <v-list-item-content
           
          >
               
                  <v-row
                    align="center"
                    justify="center"
                  > <!-- 중앙정렬 ? --> 

                    <v-list-item-icon
                      >
                      <v-icon size="40"
                          @click="social_click2">
                          $vuetify.icons.kakaoIcon
                      </v-icon>
              
                      
                    </v-list-item-icon>  

                  </v-row>
          </v-list-item-content>

      
        </v-list-item>

        <v-list-item>

             <!-- <v-list-item-title>
                 <v-row
                    align="center"
                    justify="space-around"
                    @click="logout()">
                    로그아웃
                 </v-row>
                
            </v-list-item-title> -->

        </v-list-item>
        

      </v-list>
    </v-navigation-drawer>

    <v-app-bar 
      app
      color="black"
      dense
      dark
      elevate-on-scroll
    
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Apple</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
export default {
  data: () => ({ 
      drawer: null ,
      items: [
          { title: '이벤트', icon:'mdi-home' },
          { title: '공지사항', icon: 'mdi-home' },
          { title: '영화', icon: 'mdi-home' },
        ],
      right: null,

  }),

  methods : {
     
      social_click2() {
          //alert((('click22')))


          if(!Kakao.Auth.getAccessToken()){
            //    Kakao.Auth.loginForm({
            //      success: function(authObj) {
            //        alert(JSON.stringify(authObj));
            //        console.log('authObj : ', authObj) 
            //      },
            //      fail: function(err) {
            //        alert(JSON.stringify(err));
            //        console.log('err : ', err)
            //      }
            //   })
          }else{
                window.Kakao.Auth.login({
                    scope : 'account_email, gender',
                    success: this.GetMe,
                });
          }
        

      },

      btnMovieReser() {
        alert('영화별 예약 클릭')
      },

      // Home버튼
      btnHome() {
        console.log('Home_Click')
        this.$router.push('/').catch(error => {
          
        })
      },

      // 로그인 버튼
      btnLogin(){
        console.log('Login_Click')
        this.$router.push({
          name : 'Login'
        })
      },


      GetMe(authObj){
          console.log('GetMe')
          window.Kakao.API.request({
              url: '/v2/user/me',
              success : res => {
                        
                        console.log('GetMe_Success')
                        const kakao_account = res.kakao_account;
                        console.log('account : ', kakao_account)

                        console.log('email : ', kakao_account.email)
                        console.log('gender : ', kakao_account.gender)
                        console.log('nickname : ', kakao_account.profile)

                        const userInfo = {
                            //nickname : kakao_account.profile.nickname,
                            email : kakao_account.email,
                            password : '',
                            account_type : 2,
                            gender : kakao_account.gender
                        }

                        console.log('email : ', userInfo.email)
                        console.log('nickname : ', userInfo.nickname)

                         axios.post(`http://localhost:8080/account/kakao`,{
                             email : userInfo.email,
                             //nickname : userInfo.nickname
                             gender : userInfo.gender
                         })
                         .then(res => {
                            console.log(res);
                            console.log("데이터베이스에 회원 정보가 있음!");
                         })
                         .catch(err => {
                             console.log(err);
                            console.log("데이터베이스에 회원 정보가 없음!");
                         })
                        console.log(userInfo);
                        alert("로그인 성공!");
                        
                    },
                    fail : error => {
                        this.$router.push("/errorPage");
                        console.log(error);
                    }
          })
      },

           logout(){
          //alert('logout')
            if (!Kakao.Auth.getAccessToken()) {
                    console.log('Not logged in.');
                    return;
                }
                    console.log('=================')
                    Kakao.Auth.logout(function() {
                    console.log(Kakao.Auth.getAccessToken());

                   

                    
                });
            },

      
    
  }
}
</script>

<style>
    .top-list-item{
        background: black;
    }
    .title{
        color: white;
        font-size: 50;
    }
    .subtitle{
        color: white;
    }

    
</style>