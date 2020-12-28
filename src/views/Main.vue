<template>
   <v-app id="inspire">
    <!-- <v-navigation-drawer
      v-model="drawer"
      app
    >
     
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar> -->
        <Header/>
    <v-main>
      <!--  -->
        aaa
      <hr> <br> <br> <br> <br> <br> <hr>
      <hr> <br> <br> <br> <br> <br> <hr>
      <hr> <br> <br> <br> <br> <br>
      <hr> <br> <br> <br> <br> <br>
      <hr> <br> <br> <br> <br> <br>
      <hr> <br> <br> <br> <br> <br>
      <hr> <br> <br> <br> <br> <br><hr>
      <hr> <br> <hr>
      <hr> <br> <hr>
      <hr> <br> <hr>
      <hr> <br> <hr>

    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex"
export default {

  data(){
      return { 
          subject : "",
      }
  },

  computed: {
    ...mapState(["isLogin"])
  },

  created(){
    console.log('main_craeted()')
    
    console.log(this.isLogin);
  }
}
</script>

<style>

</style>