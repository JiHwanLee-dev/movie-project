<template>
  <div class="theater-container">
      
     <div class="left-taps">
       <!-- {{ city_list }} -->
       <div :class="lists.class" v-for="(lists,index) in city_list" :key="lists.city"  
              :style="isClicked" @click="btnCity(index)" >
         <div style="float: left; " >  {{ lists.city }} </div>
          <div class="theater-cnt-class" style=" margin-right: 14px;"> {{ lists.theater_cnt }} </div> 
       </div>
     </div>
     
     <div class="right-taps">
       <div :class="lists.class" v-for="(lists,index) in theater_result" :key="lists.theater" 
             :style="isClicked" @click="btnTheater(index)" >
          <div style="float: left; margin-left: 10px;">
              {{ lists.theater }}
          </div>
       </div>

     </div>




  </div>
</template>

<script>
/*eslint-disable */
import axios from 'axios'
export default {
  data(){
    return {

      test: {
        id : 'ididid'
      },

      city_list: null,
      theater_list: null,
      theater_result: [],

      nationwide_city: 'nationwide-city',
      nationwide_theater: 'nationwide-theater',

      isClicked: false,

      dataRes : null,
      dataRes2 : null,

      // 도시 클릭 시 
      clickedCheck : 
        {
          index : 0,
          city: '서울'
        },
      
      // 극장 클릭 시 
      clickedCheck2 : {
          index : 0,
          theater: ''
      }

    }
  },

  mounted() {
    console.log('aasdfqf')
  },

  created() {

     //var jsonData = JSON.stringify(this.test);
     axios({
        url: "http://192.168.103.24:3000/selectTheater",
        method: "get",

    }).then(res => {
        console.log('TheaterResult : ', res);
        //alert('TheaterResult : ', res);

        this.city_list = res.data.data
        this.theater_list = res.data.data2

        for(var i = 0; i < res.data.data.length; i++){

          if(this.city_list[i].city == '서울'){
            //console.log('서울 / ' + i)
            this.city_list[i].class = 'nationwide-city-on'
          }else{
            this.city_list[i].class = 'nationwide-city'
          }

        }


        for(var j = 0; j < this.theater_list.length; j++){
          this.theater_list[j].class = 'nationwide-theater'
          if(this.theater_list[j].city == '서울'){
            console.log(this.theater_list[j])
            this.theater_result.push(this.theater_list[j])
            //this.theater_result.theater = this.theater_list[j].theater;
          }
        }

      //alert(JSON.stringify(this.theater_result))
        


        
        console.log('aa : ' + JSON.stringify(this.theater_result))
        console.log('TheaterResult2 : ', this.city_list);
        this.dataRes = res.data.data[0].city;
        this.dataRes2 = res.data.data.length;  


    }).catch(function (err) {
        console.log('err: ', err);
    })



  },

  computed: {

  },

  methods: {
    // 도시 클릭
    btnCity(index){

      this.isClicked = !this.isClicked 
      //alert(this.city_list[index].city)
      // 이미 클릭된 index번호 
      var clicked_index = this.clickedCheck.index;

      // 선택한 도시 정보 저장 
      this.clickedCheck.index = index;
      this.clickedCheck.city = this.city_list[index].city

      // 선택한 도시 index에 -on변수를 줘 배경색을 skyblue지정
      // 이전에 선택한 도시 index에는 배경색을 white지정
      this.city_list[clicked_index].class = this.nationwide_city;
      this.city_list[index].class = this.nationwide_city + '-on'

      // 현재 영화관 정로 리스느 초기화 
      this.theater_result.length = 0

      // 모든 지역 영화관정보에서 선택한 도시에 맞는 영화관을 보여줌
      for(var j = 0; j < this.theater_list.length; j++){
        this.theater_list[j].class = 'nationwide-theater'  // class객체 추가
        
        // 모든 영화관에서 선택한 도시에 맞는 영화관이 있는지 확인 
        if(this.theater_list[j].city == this.clickedCheck.city){
          console.log(this.theater_list[j])

          // 해당 도시에 있는 영화관 정보를 theater_Result에 push함
          this.theater_result.push(this.theater_list[j])
        }
      }
      
      // 영화관이 선택되어있는데, 도시 클릭 시 선택한 영화관 정보를 초기화함 
      var theater_index = this.clickedCheck2.index;
      this.theater_result[theater_index].class = this.nationwide_theater;

      this.clickedCheck2={
          index: 0,
          theater: ''
      }
    
      this.$emit('test', this.clickedCheck2);

      //console.log(this.city_list)
      console.log(this.theater_result);
       
    },

    btnTheater(index) {
      this.isClicked = !this.isClicked
      console.log('index: ' + index)
      console.log('theater : ' + this.theater_list[index].theater)

      var clicked_index = this.clickedCheck2.index;
  
      // 이미 클릭 된 극장을 클릭 시 
      if(this.theater_result[index].theater == this.clickedCheck2.theater){
        
        this.clickedCheck2={
          index: 0,
          theater: ''
        }

        this.theater_result[clicked_index].class = this.nationwide_theater;

        // alert('index: ' + index + ' / ' + 'clicked_index: ' + clicked_index + " / " + 
        //     'clickedCheck2 : ' + JSON.stringify(this.clickedCheck2))
        
      }else{
        //alert('index: ' + index + ' / ' + 'theater: ' + this.theater_result[index].theater)
        this.clickedCheck2.index = index;
        this.clickedCheck2.theater = this.theater_result[index].theater

        this.theater_result[clicked_index].class = this.nationwide_theater;
        this.theater_result[index].class = this.nationwide_theater + '-on'
      }
      
      
      this.$emit('test', this.clickedCheck2);

    }
  }
}
</script>

<style scoped>

.theater-container{
  /* border: 5px solid red; */
  display: inline-block;
  width: 100%;
}

.left-taps {
   width: 40%;
   float: left;
   /* border: 1px solid yellow; */
   border-right: 1px solid #e6e6e6;
}

.right-taps {
  width: 60%;
  display: inline-block;
  /* border-right: 1px solid #e6e6e6; */
  /* border: 1px solid black; */
    overflow-y: scroll;
    /* overflow: hidden; */
    height: 500px;

}

/* 스크롤 막대만 숨기기 */
.right-taps::-webkit-scrollbar{
  display: none;
}

.nationwide-city{
  
  height: 40px;
  border-bottom: 1px solid #e6e6e6;
  border-collapse: collapse;
  display: block;
  padding-top: 10px;
  font-size: 13px;
}

.nationwide-city-on{
  padding-top: 10px;
   height: 40px;
  background: skyblue;
  border-collapse: collapse;
  display: block;
  font-size: 13px;
}


.nationwide-theater{
  /* border: 1px solid gray; */
  height: 40px;
  border-bottom: 1px solid #e6e6e6;
   padding-top: 10px;
  font-size: 13px;
}

.nationwide-theater-on{
  /* border: 1px solid gray; */
  background: skyblue;
  height: 40px;
  border-bottom: 1px solid #e6e6e6;
   padding-top: 10px;
  font-size: 13px;
}


.theater-cnt-class{
  text-align: right;
}

</style>