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
                {{ col }}
            </div>
            
        </div>      
     </div>

     <div class="t1"></div> 예매가능
     <div class="t2"></div> 예매불가
    </div>
    

   <div class="test2"></div>


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

      
      function Arr2(rows, columns){
        var arr = new Array(rows)
        for(var i = 0; i < rows; i++){
          arr[i] = new Array(columns);
        }

        console.log('arr : '+arr)

        return arr;
      }


      var seatArr = Arr2(this.column,this.rows);
      console.log('seatArr1 : ' + seatArr)

    



      for(var i = 0; i < this.column; i++){
            //console.log('aa')
          for(var j = 0; j < this.rows; j++){
            //console.log('bb')
        

              //testArr[i][j] = this.
             //console.log('rows : ' + this.seat[i][j])
          }
      }


    
      
    },


    mounted(){
      console.log()
    },

    methods: {
  
      // 좌석 클릭
      btnSeat(value, row, col){
        
        if(value != 't0'){
          if(value == 't2'){
            alert('선택한 좌석은 예약이 완료된 좌석입니다.  다른 좌석을 선택해주세요.')
          }else if(value == 't3'){
            this.isClicked = !this.isClicked;          // ?????????????????????? 
            this.seat[row][col] = 't1'
          }else{
            console.log('isClicked : ' + this.isClicked)
            this.isClicked = !this.isClicked;
          
            if(row == 0){
            this.seatNum = 'A';
          }else if(row == 1){
            this.seatNum = 'B';
          }
          //alert('value : ' + value + ' / ' + '(' + this.seatNum + (col+1) + '좌석'+')');
          this.seat[row][col] = 't3'
          
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
    background: blue;
    width: 30px;
    height: 30px;
  }

  .seatDivs{
    text-align: center;
    border: 1px solid black;
    
  }

  .t0{
    width: 20px;
    height: 20px;
    background: white;
     margin-right: 2px;
     vertical-align: middle;
    /* font-size: 70; */
  }

  .t1{
    text-align: center; 
    display: inline-block;
    width: 20px;
    height: 20px;
    background: gray;
    margin-right: 2px;
    cursor: pointer;
    vertical-align: middle;
    /* font-size: 70; */
  }

  .t2{
    text-align: center; 
    display: inline-block;
     width: 20px;
    height: 20px;
    background: red;
     margin-right: 2px;
     cursor: pointer;
     vertical-align: middle;
  }

  .t3{
     width: 20px;
    height: 20px;
    background: blue;
     margin-right: 2px;
     cursor: pointer;
     vertical-align: middle;
  }

  
</style>