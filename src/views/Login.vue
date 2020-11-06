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
          <v-card>
            <v-tabs
            v-model="tab"
            background-color="primary"
            dark
            >
            <v-tab
                v-for="item in items"
                :key="item.tab"
            >
                {{ item.tab }}
            </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="item in items"
                :key="item.tab"
            >
                <v-card flat>
                <v-card-text>{{ item.content }}</v-card-text>
                </v-card>
            </v-tab-item>
            </v-tabs-items>
        </v-card>

        <v-row>
            <v-col>
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