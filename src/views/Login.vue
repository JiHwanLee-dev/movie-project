<template>
  <v-app>
    <v-app-bar 
        app
        flat
        color="white"
    >
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
                    
                    color="primary"
                >
                    로그인
                </v-btn>

                
            </v-col>

            

            
        </v-row>

       
        
      </v-container>
    </v-main>
 </v-app>
</template>

<script>
export default {
    data() {
        return {
            tab: null,
            items: [
                { tab: 'One', content: 'Tab 1 Content' },
                { tab: 'Two', content: 'Tab 2 Content' },
            ],
        }
    }
}
</script>

<style>

</style>