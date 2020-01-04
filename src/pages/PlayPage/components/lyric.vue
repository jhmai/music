<template>   
    <div class="lyric" @click="show">
       <div class="scrollview" ref="lyricview">
         <ul ref="lyricul" 
           :style="{transform: 'translateY('+scrollY+')'}" 
           :class="{anim:!touch}"
            @touchstart='onStart'
            @touchmove='onMove'
            @touchend='onEnd'
            >
           <li v-for="(item,index) in lyricList" 
           :key="index" 
           v-if="item[1]" 
           :class="{current:item[0]<currentTime&&item[3]>currentTime}" 
           :ref="item[0]<currentTime&&item[3]>currentTime?'current':''">
            {{item[1]}}
           </li>
         </ul>
       </div>
    </div>
</template>

<style scoped>
.lyric{
  width: 100%;
  height: 70%;
  padding: 0 .8rem;
  margin-top: .2rem;
  z-index: 99;
  position: absolute;

}
.scrollview{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scrollview ul{
  width: 100%;
  align-items: center;
}
.anim{
  transition: all 1s;
}
li{
  width: 100%;
  padding: .2rem 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: .25rem;
}
.current{
  color: #ffffff;
}
</style>

<script>
export default {
  name: 'lyric',
  data(){
    return{
      lyricList:[],
      lyricHeight:'',
      scrollY:0,
      start:'',
      tem:'',
      touch:false
    }
  },
  components: {
    
  },
  methods:{
    onStart(e){
      console.log(e.targetTouches[0].clientY);
      this.start=e.targetTouches[0].clientY;
      this.tem=this.scrollY;
      this.touch=true
    },
    onMove(e){
      // console.log(e.targetTouches[0].clientY)
      this.scrollY=Number(this.tem.split('px')[0])+Number((e.targetTouches[0].clientY-this.start))+'px';
      console.log(this.scrollY)
    },
    onEnd(e){
      console.log(e)
      setTimeout(()=>{
        this.touch=false
      },1000)
      
    },
    show (){
      console.log(11)
      this.$emit('show','dish')
    }
  },
  props:{
    lyric:{
      type:String
    }
  },
  computed:{
    currentTime () {
      return this.$store.state.currentTime
    }
  },
  updated(){
    this.$nextTick(()=>{
      this.lyricHeight=this.$refs.lyricview.offsetHeight/2
    }) 
  },
  watch:{
    lyric () {
      let arr=this.lyric.split('[');
      let lyricArr=[];
      arr.forEach(item=>{
        lyricArr.push(item.split(']'))
      })
      // console.log(lyricArr)
      lyricArr.forEach(item=>{
        item[0]=(Number(item[0].split(':')[0]*60)+Number(item[0].split(':')[1])).toFixed(3); 
      })

      for (var i = 0; i < lyricArr.length-1; i++) {
        lyricArr[i][3]=lyricArr[i+1][0];
      }
      lyricArr[lyricArr.length-1][3]=999999;
      
      this.lyricList=lyricArr
      console.log(this.lyricList) 
    },
    currentTime () {
      // this.$refs.lyricview.scrollTop=this.$refs.current[0].offsetTop-this.lyricHeight;

      if (!this.touch) {
        this.scrollY=-(this.$refs.current[0].offsetTop-this.lyricHeight)+'px';
      }
        
      // console.log(this.$refs.current[0].offsetTop,this.lyricHeight)
    }
  }

}
</script>
