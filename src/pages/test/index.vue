<template>
  <div class="sphereBox">
    <sphere/>
  </div>
</template>

<script>
import sphere from '@/components/sphere'

export default {
  name: 'Home',
  data () {
    return {
      
    }
  },
  components:{
    sphere
  },
  mounted(){
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sphereBox{
  width: 100%;
  height: 400px;
}
</style>
