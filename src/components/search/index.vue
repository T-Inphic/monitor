<template>
  <div class="searchBox">
    <at-input v-model="inputText" placeholder="请输入内容" append-button>
      <template slot="append">
        <i class="icon icon-search" @click="search"></i>
      </template>
    </at-input>
    <!-- <at-input v-model="inputText" @blur="search"></at-input> -->
    <ul v-if="list.length">
      <li v-for="(item,index) in list" :key="index" @click="clickMe(item)">{{item.ShortName}} {{item.OuterCode}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
  	return {
      inputText: '',
      list: [],
  	}
  },
  mounted(){
    
  },
  methods: {
    search(){
      if(this.inputText.length==4||this.inputText.length==3){
        let url = this.$url.search.url+'?input='+this.inputText+'&type=8&token=D43BF722C8E33BDC906FB84D85E326E8&count=4&_=1543913634755'
        $.ajax({
          type:"GET",
          url:url, //访问的链接
          dataType:"jsonp",  //数据格式设置为jsonp
          jsonp:"cb",  //Jquery生成验证参数的名称
          success: data =>{  //成功的回调函数
              // console.log(data);
              if(data.GubaCodeTable.Data){
                this.list = data.GubaCodeTable.Data
              }
              
              // console.log(data)
          },
          error: function (e) {
              console.log(e)
          }

        })
      }else{
        this.list = []
      }
    },
    clickMe(item){
      this.list = []
      this.$emit('clickItem',item)
    }
  }
}
</script>

<style scoped lang="scss">
  .searchBox{
    position: relative;
    width: 240px;
    li{
      cursor: pointer;
    }
    ul{
      position: absolute;
      top: 28px;
      z-index: 200;
      right: -100%;
      width: 100%;
      background-color: #fff;
    }
  }
</style>
