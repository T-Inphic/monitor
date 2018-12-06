<template>
  <div class="home">
    <!-- <div v-for="(item, index) in data" :key="index">
      <p>{{item.title}}<img :src="item.thumbnail_pic_s"/></p>
    </div> -->
    
    <!-- <FyButton>small</FyButton> -->
    <search @clickItem = "renderItem"/>
    <div class="tableBox">
       <at-table
        size="small"
        :border="true"
        :columns="columns"
        :data="tableData">
          
      </at-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
import search from '@/components/search'
// import FyButton from '../../packages/button/index.js'

// Vue.component(FyButton.name, FyButton)
export default {
  name: 'Home',
  data () {
    return {
      columns: [{
          title: '名字',
          key: 'name'
        },
        {
          title: '价格',
          key: 'price'
        },
        {
          title: '涨幅',
          key: 'rise'
        },
        {
          title: '差价',
          key: 'chaj'
        },
        {
          title: '买一',
          key: 'buy'
        },
        {
          title: '卖一',
          key: 'sale'
      }],
      tableData:[],
      itemObj: {},
      searchList:[{
        ShortName: '上证指数',
        OuterCode: '000000'
          },{
            ShortName: '全新好',
        OuterCode: '000007'
          },{
            ShortName: '亚普股份',
        OuterCode: '603013'
          },{
            ShortName: '伯特利',
        OuterCode: '603596'
          },{
            ShortName: '昂利康',
        OuterCode: '002940'
          },{
            ShortName: '中原内配',
        OuterCode: '002448'
          }]
    }
  },
  components:{
    search
  },
  mounted(){
    this.searchList.map(item=>{
      this.renderItem(item)
    })
  },
  methods: {
    renderItem(item){
      // OuterCode
      if(item.ShortName == '上证指数'){
        this.dapan('上证指数')
        setInterval(()=>{
          this.dapan('上证指数')
        },3000)
        // OuterCode
      }else{
        if(this.itemObj.ShortName == undefined){
          this.$set(this.itemObj,item.ShortName,false)
        }
        // console.log({...this.itemObj})
        this.$sse(item, this.tableData, this.itemObj)
      }
    },
    dapan(name){
      let url = 'http://nuff.eastmoney.com/EM_Finance2015TradeInterface/JS.ashx?id=0000011&token=44c9d251add88e27b65ed86506f6e5da'
      $.ajax({
        type:"GET",
        url:url, //访问的链接
        dataType:"jsonp",  //数据格式设置为jsonp
        jsonp:"cb",  //Jquery生成验证参数的名称
        success:(data)=>{  //成功的回调函数
          // console.log(data.Value)
          let obj = {
            name: data.Value[2],
            price: data.Value[25],
            rise: data.Value[29] + '%',
            buy: 0,
            sale: 0
          },isHas = false
          this.tableData.map((item,index,array)=>{
            if(item.name == name){
              isHas = true
              this.$set(this.tableData,index,obj)
            }

          })
          if(!isHas){
            this.tableData.unshift(obj)
          }
        },
        error: function (e) {
            console.log(e)
        }

      })
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home{
  padding: 20px;
}
.tableBox{
  width: 500px;
}
</style>
