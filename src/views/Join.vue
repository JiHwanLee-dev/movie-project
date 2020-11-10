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
                회원가입
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
                cols="11"
                sm="7"  
            >

                <v-text-field
                    prepend-icon="mdi-account"
                    label="아이디"
                >

                </v-text-field>

            </v-col>

            <v-col
                cols="1"
                
            >
                <v-btn
                     rounded
                >
                    중복확인
                </v-btn>
            </v-col>


            <v-col
                cols="12"
                sm="8"  
            >

    
                <v-text-field
                    v-model="password"
                    label="비밀번호"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="passwordRules"
                />

                <v-text-field
                    v-model="confirmPassword"
                    label="비밀번호 확인"
                    name="confirmPassword"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="confirmPasswordRules"
                />

                <v-text-field
                    v-model="name"
                    label="이름"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                    :rules="nameRules"
                />

                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="date"
                        label="생년월일"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                    ></v-date-picker>
                </v-menu>

                </v-col>

                <v-col
                   cols="11"
                    sm="7"  
                > 

                    <v-text-field
                        v-model="email"
                        label="이메일"
                        name="email"
                        prepend-icon="mdi-email"
                        type="text"
                        :rules="emailRules"
                    />     

                </v-col>  


                <v-col
                    cols="1"           
                >            
                    <v-btn
                        rounded
                        @click="btnEmailAuth"
                    >
                        인증
                    </v-btn>
                </v-col> 
            </v-row>

            <!-- 인증번호가 이메일로 발급 시 이 row태그가 생김. -->
            <v-row
                align="center"
                justify="center"
                v-if="boolAuth"
            >

                <v-col
                   cols="8"
                    sm="5"            
                > 
                    <v-text-field
                        v-model="authNum"
                        label="인증번호 입력"
                        name="authNum"
                        prepend-icon="mdi-email"
                        type="text"
                    />     

                </v-col>  

                <v-col
                    cols="3"
                    sm="2"
                >
                    <span>
                        {{ authTime }}
                    </span>
              
                </v-col>

                <v-col
                    cols="1"       
                    
                >            
                    <v-btn
                        rounded
                        @click="btnEmailAuthCheck"
                    >
                        인증완료
                    </v-btn>
                </v-col> 
        </v-row>

        <v-row
            align="center"
            justify="center"
        >
            <v-col
                cols="12"
                sm="8"
            >
                <v-btn
                    class="primary"
                    block
                >
                    가입하기
                </v-btn>
            </v-col>
        </v-row>

       

      </v-container>
    </v-main>
 </v-app>
</template>

<script>
/* tslint:disable:no-empty */
import axios from 'axios'

export default {
    data() {
        return {
            tab: null,
            id: 'id',
            passwd: '',
            passwdChk: '',
            name: '',
            email: '',


            password: '',
            confirmPassword: '',
            
            passwordRules: [
                (value) => !!value || '비밀번호를 입력하세요. ',
                (value) => (value && value.length >= 6) || '비밀번호는 6~15자리만 가능합니다.',
            ],
            confirmPasswordRules: [
                (value) => !!value || '비밀번호 확인',
                (value) => value === this.password || '비밀번호가 일치하지 않습니다. ',
            ],
            nameRules: [
                (value) => !!value || '이름을 입력하세요. '
            ],
            emailRules: [
                (value) => !!value || '이메일을 입력하세요. '
            ],

            date: null,
            menu: false,
            authNum: null,
            boolAuth: false,                  // 인증번호를 받앗는지 안받앗는지 체크
            test11 : '',
            authTime: '',
            boolAuthTimer: false,             // 인증버튼 클릭 시, 타이머의 동작 유무
        }
    },

    created() {
        //let authNum = Math.random().toString().substr(2,6);
        //console.log('authNum: ', authNum)

        console.log(this.boolAuth)
        // this.test11 = '1초';
    },

  
    watch: {
        menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },

    methods: {

        btnTest(){

            var setTime = 63;  // 초단위

            // 화살표 함수를 써야 vue 인스턴스에 바인딩 할 수 있음.
            var refreshIntervalId = setInterval(() => {
                var m = Math.floor(setTime / 60) + "분 " + (setTime % 60) + "초";
                
                
                if(setTime < 60){
                    m = (setTime % 60) + "초";
                }

                this.test11 = m;
                 console.log('시간 : ', m)
                 console.log(this.test11);

                 setTime --;

                if(setTime < 0){
                    clearInterval(refreshIntervalId)
                }
            }, 1000)

            console.log('time : ', this.test11)


            //this.test11 = minute


        },



       btnBack(){
           this.$router.push({
               name: "Login"
           })
       },

        checkPassword(invalid) { 
            // correct: false
            if (true == invalid) {
                this.validPassword = false;
            } else {
                this.validPassword = true;
            }
        },

        save(date) {
            this.$refs.menu.save(date)
        },

        btnEmailAuth() {
            console.log(this.email)   

            axios({
                url: `http://localhost:4000/emailAuth`,
                method: "post",
                data: {},
                headers: {
                    'content-type': 'application/json',
                }
            }).then(res => {
                console.log('join_res : ', res);

                // 인증 시간 부여 (3분)
                
           
                //this.authNum = res.data.authNum;
                this.boolAuth = true;

                
                var setTime = 180;  // (3분) 초 단위
                this.boolAuthTimer = true;  // 타이머 동작 유무

                // 화살표 함수를 써야 vue 인스턴스에 바인딩 할 수 있음.
                var refreshIntervalId = setInterval(() => {
                    var m = Math.floor(setTime / 60) + "분 " + (setTime % 60) + "초";
                    
                    if(setTime < 60){
                        m = (setTime % 60) + "초";
                    }

                    this.authTime = m;
                    console.log('시간 : ', m)
                    //console.log(this.authTime);

                    setTime --;

                    if(setTime < 0){
                        clearInterval(refreshIntervalId);
                    
                    // 인증 완료 시 , 인증 타이머를 멈춤.
                    }else if(!this.boolAuthTimer){
                        clearInterval(refreshIntervalId);
                    }

                }, 1000)




            }).catch(err => {
                console.log('err : ', err);
            })
        },

        // 인증 확인 버튼 클릭
        btnEmailAuthCheck(){

            console.log('boolAuth : ', this.boolAuth)

            //var boolNum = this.boolAuth;
            
            // var aa = true;

            // 이메일 인증번호를 받은 경우
            if(this.boolAuth){
                console.log();

                console.log('authNum : ', this.authNum);

                axios({
                    url: `http://localhost:4000/emailAuthConFirm`,
                    method: "post",
                    data: {
                        authNum: this.authNum
                    },
                    headers: {
                        'content-type': 'application/json',
                    }

                }).then(res => {
                    console.log('joinAuthCheck_res : ', res);

                    // 클라이언트에서 보낸 인증번호가 맞을 경우
                    if(res.data.result == 'ok'){
                        alert('인증이 완료되었습니다. ')
                        this.boolAuthTimer = false;

                    }else {
                        alert('인증번호가 틀립니다. 다시 확인해주세요.')
                    }



                }).catch(err => {
                    console.log('err : ', err);
                })


            }else{
                alert('이메일 인증을 하십시요. ')
            }
        }



    }
}
</script>

<style>

</style>