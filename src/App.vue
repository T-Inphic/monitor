<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <button @click="popupVisible = true">日期</button>
    <mt-popup
	  v-model="popupVisible"
	  position="bottom"
	  style="width:100%">
	  <mt-picker :slots="slots" @change="setSlotValue"></mt-picker>
	</mt-popup> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
  	return {
  		popupVisible: false,
  	}
  },
  mounted(){
  },
  methods: {
  	
  }
}
</script>

<style>

</style>
