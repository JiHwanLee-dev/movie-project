<template>
  <div>
    reserve
    {{ seat }}
    <h1 class="seatDiv" v-html="seat"></h1>
    <div style="border: 1px solid red;">
        <table>
            <tr>
                <td><div class="test1"></div></td>
                <td><div class="test1"></div></td>
            </tr>
            <tr>
                <td>dassaasd</td>
                <td>1155485</td>
            </tr>
        </table>
    </div>
    <br><br>
    <div class="seatDivs">
      screen
      <br>
      <div v-for="(row, idx_row) in seat" :key="row.i" style="border: 1px solid blue; text-align: center;">
        <div v-for="(col, idx_col) in row" :key="col.j" style="display: inline; text-align: center; "> 
           
            <div style="display: inline-block" :class="col" :style="isClicked"  @click="btnSeat(col, idx_row, idx_col)" >
              

             
                <div v-if="seat[idx_row][idx_col] !== 't0'">
                    <div v-if="idx_row == 0" style=" text-align: center; vertical-align: middle;" >
                        <span style="">
                            A{{ idx_col + 1}}
                        </span>
                    </div>
                    <div v-else-if="idx_row == 1">
                        <span>
                            B{{ idx_col + 1}}
                        </span>
                    </div> 
                </div>
              <div v-else="" @change="ppp">
                 
              </div>
           


            </div>
            
        </div>      
     </div>

     <div class="t1"></div> 예매가능
     <div class="t2"></div> 예매불가


  
    </div>
 

    
   <div class="test2">
       <span class="test2-span"> asdada a</span>
   </div>




  </div>
</template>

<script>
//var aa = 0;

export default {
    data() {
        return{
          // 테스트 좌석 배치도
          seat: [
            ['t1','t2','t1','t0','t1','t2','t1','t1','t0','t1','t1','t2',],
            ['t2','t1','t1','t0','t1','t1','t1','t1','t0','t1','t1','t1',]
          ],

          // seatss: [
          //   [{seat: 't1', num: 1},'t2','t1','t0','t1','t2','t1','t1','t0','t1','t1','t2',],
          //   ['t2','t1','t1','t0','t1','t1','t1','t1','t0','t1','t1','t1',]
          // ],


          //testArr: [2][12],

          //seatNum: [][],

          Arr: [],

          rows: null,
          column: null,
          //seat: '<button class="posible"> 9 </button>',
          aa: null,
          seatNum: null,

          isClicked: false,



        }
    },

  

    created() {
      //this.seat[1][1] = `<button class="posible"> 9 </button>`
      console.log('seat1.size : '+this.seat[0].length)
      console.log('seat2.size : '+this.seat.length)
      
      this.rows = this.seat[0].length;
      this.column = this.seat.length;
      
      console.log(this.seat[1][1])
      console.log(this.seat)

    

      //this.asd = 'aaa';

      for(var i = 0; i < this.column; i++){
            //console.log('aa')
          for(var j = 0; j < this.rows; j++){
            
           
            if(i == 0){           // A열 좌석
              //this.$set(this.seat[i], j, 'A'+(j+1))

              //this.asd = 'A'+(j+1);

              //this.seat[i][j] = 'A'+(j+1)
            }else if(i == 1){       // B열 좌석
               //this.asd = 'A'+(j+11);
              console.log()
            }
            console.log('좌석 : ', this.seat[i][j] + ' ')
            console.log()
        

              //testArr[i][j] = this.
             //console.log('rows : ' + this.seat[i][j])
          }
      }


    
      
    },


    mounted(){
      console.log()
    },

    computed: {
      
    },

    watch:  {
      seat: function(){
        //alert('sdadas')
      }
    },


    methods: {
      
      ppp() {
        console.log('ppp : ', this.seat)
      },

      // 좌석 클릭
      btnSeat(value, row, col){
        
        var num;

        if(value != 't0'){
          if(value == 't2'){
            alert('선택한 좌석은 예약이 완료된 좌석입니다.  다른 좌석을 선택해주세요.')

          }else if(value == 't3'){                     // 예약한 좌석을 다시 클릭 햇을 시, 예약가능 표시로 바꿔줌.
            //this.isClicked = !this.isClicked;          // ?????????????????????? 
            //this.seat[row][col] = 't1'
            this.$set(this.seat[row], col, 't1'); 
            //this.seat[row][col].replace(row,col,'t1');
          }else{
            console.log('isClicked : ' + this.isClicked)
            //this.isClicked = !this.isClicked;
          
            if(row == 0){
              num = 'A';
            }else if(row == 1){
              num = 'B';
            }
          //alert('value : ' + value + ' / ' + '(' + this.seatNum + (col+1) + '좌석'+')');
          this.seatNum = num + (col + 1);
          console.log('좌석 : ' + this.seatNum);
          
          console.log('aa : ', this.seat[1])

          //this.seat[row][col] = 't3'            // 이런식으로 값을 바꿔버리면, vue에서 바뀐값을 인식하지 못함.
          this.$set(this.seat[row], col, 't3');   // vue set함수로 특정 배열의 값 수정

          //window.location.reload();
          console.log(this.seat);
          }
        }
        
      }
      
    }
}
</script>

<style scoped>
  .seatDiv{
    border: 1px solid blue;
  }
  .seatDiv ::v-deep .posible{
    color: blue;
    border: 1px soild blue;
  }

  .test1{
    background: red;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .test2{
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    border: 1px solid red;
    width: 80px;
    height: 80px;
  }

  .test2-span{
    border: 1px solid blue; 
  }

  .seatDivs{
    text-align: center;
    border: 1px solid black;
    
  }

  .t0{
 
    width: 30px;
    height: 30px;
    background: white;
     margin-right: 2px;
     vertical-align: middle;
    /* font-size: 70; */
  }

  .t1{

    text-align: center; 
    display: inline-block;
    width: 30px;
    height: 30px;
    background: gray;
    margin-right: 2px;
    cursor: pointer;
    vertical-align: middle;
    /* font-size: 70; */
  }

  .t2{

    text-align: center; 
    display: inline-block;
     width: 30px;
    height: 30px;
    background: red;
     margin-right: 2px;
     cursor: pointer;
     vertical-align: middle;
  }

  .t3{

     width: 30px;
    height: 30px;
    background: blue;
     margin-right: 2px;
     cursor: pointer;
     vertical-align: middle;
  }

  
</style>