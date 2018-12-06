<template>
  <div class="sphere">
    <div class="item" v-for="(item, index) in data" :key="index" :style="item.style">{{item.name}}</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
  	return {
      item: '介绍了一种轴对称非球面透镜的光轴',
  		data: []
  	}
  },
  mounted(){
    this.item.split('').map(item => {
      this.data.push({
        name: item,
        style: {
          color: '#fff',
          top: 0,
          right: 0,
          zIndex: 1,
          opacity: 1,
          fontSize: '14px',
        }
      })
    })
    // this.init()
  },
  methods: {
  	init(){
      setInterval(item=>{
        this.data.map((citem, cindex)=>{
            var a , b;
            var k = (2*(cindex+1)-1)/(this.data.length) - 1;
            var a = Math.acos(k);
            var b = a*Math.sqrt(this.data.length*Math.PI);
            // var a = Math.random()*2*Math.PI;
            // var b = Math.random()*2*Math.PI;
            var x = 180 * Math.sin(a) * Math.cos(b)+200;
            var y = 180 * Math.sin(a) * Math.sin(b)+200; 
            var z = 180 * Math.cos(a);
            this.move(citem, x, y, z)
        })
        // console.log(this.data)
      },100)
    },
    //计算坐标
    move(item, x, y, z){
      let scale = 500/(500-z);
      let alpha = (z+180)/(2*180);
      item.style.fontSize = 15 * scale + "px";
      item.style.opacity = alpha+0.5;
      // this.ele.style.filter = "alpha(opacity = "+(alpha+0.5)*100+")";
      item.style.zIndex = parseInt(scale*100);
      item.style.top = y + 'px'
      item.style.left = x + 'px'
    },
    coordinate(){
      var tagEle = "querySelectorAll" in document ? document.querySelectorAll(".tag") : getClass("tag"),
          paper = "querySelectorAll" in document ? document.querySelector(".tagBall") : getClass("tagBall")[0];
          RADIUS =300,
          fallLength = 500,
          tags=[],
          angleX = Math.PI/500,
          angleY = Math.PI/500,
          CX = paper.offsetWidth/2,
          CY = paper.offsetHeight/2,
          EX = paper.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft,
          EY = paper.offsetTop + document.body.scrollTop + document.documentElement.scrollTop;

        function getClass(className){
          var ele = document.getElementsByTagName("*");
          var classEle = [];
          for(var i=0;i<ele.length;i++){
            var cn = ele[i].className;
            if(cn === className){
              classEle.push(ele[i]);
            }
          }
          return classEle;
        }

        function innit(){
          for(var i=0;i<tagEle.length;i++){
            var a , b;
            var k = (2*(i+1)-1)/tagEle.length - 1;
            var a = Math.acos(k);
            var b = a*Math.sqrt(tagEle.length*Math.PI);
            // var a = Math.random()*2*Math.PI;
            // var b = Math.random()*2*Math.PI;
            var x = RADIUS * Math.sin(a) * Math.cos(b);
            var y = RADIUS * Math.sin(a) * Math.sin(b); 
            var z = RADIUS * Math.cos(a);
            var t = new tag(tagEle[i] , x , y , z);
            tagEle[i].style.color = "rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")";
            tags.push(t);
            t.move();
          }
        }

        Array.prototype.forEach = function(callback){
          for(var i=0;i<this.length;i++){
            callback.call(this[i]);
          }
        }

        function animate(){
          setInterval(function(){
            rotateX();
            rotateY();
            tags.forEach(function(){
              this.move();
            })
          } , 17)
        }

        if("addEventListener" in window){
          paper.addEventListener("mousemove" , function(event){
            var x = event.clientX - EX - CX;
            var y = event.clientY - EY - CY;
            // angleY = -x* (Math.sqrt(Math.pow(x , 2) + Math.pow(y , 2)) > RADIUS/4 ? 0.0002 : 0.0001);
            // angleX = -y* (Math.sqrt(Math.pow(x , 2) + Math.pow(y , 2)) > RADIUS/4 ? 0.0002 : 0.0001);
            angleY = x*0.0001;
            angleX = y*0.0001;
          });
        }
        else {
          paper.attachEvent("onmousemove" , function(event){
            var x = event.clientX - EX - CX;
            var y = event.clientY - EY - CY;
            angleY = x*0.0001;
            angleX = y*0.0001;
          });
        }

        function rotateX(){
          var cos = Math.cos(angleX);
          var sin = Math.sin(angleX);
          tags.forEach(function(){
            var y1 = this.y * cos - this.z * sin;
            var z1 = this.z * cos + this.y * sin;
            this.y = y1;
            this.z = z1;
          })
          
        }

        function rotateY(){
          var cos = Math.cos(angleY);
          var sin = Math.sin(angleY);
          tags.forEach(function(){
            var x1 = this.x * cos - this.z * sin;
            var z1 = this.z * cos + this.x * sin;
            this.x = x1;
            this.z = z1;
          })
        }

        var tag = function(ele , x , y , z){
          this.ele = ele;
          this.x = x;
          this.y = y;
          this.z = z;
        }

        tag.prototype = {
          move:function(){
            var scale = fallLength/(fallLength-this.z);
            var alpha = (this.z+RADIUS)/(2*RADIUS);
            this.ele.style.fontSize = 15 * scale + "px";
            this.ele.style.opacity = alpha+0.5;
            this.ele.style.filter = "alpha(opacity = "+(alpha+0.5)*100+")";
            this.ele.style.zIndex = parseInt(scale*100);
            this.ele.style.left = this.x + CX - this.ele.offsetWidth/2 +"px";
            this.ele.style.top = this.y + CY - this.ele.offsetHeight/2 +"px";
          }
        }
        innit();
        animate();
    }
  }
}
</script>

<style scoped lang="scss">
  .sphere{
    width: 100%;
    height: 100%;
    background-color: red;
    overflow: hidden;
    position: relative;
    .item{
      position: absolute;
      width: 30px;
      top: 0;
      right: 0;
    }
  }
</style>
