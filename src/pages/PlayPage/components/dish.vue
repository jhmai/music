<template>   
    <div class="dishpage" @click='show'>
        <div class="dish-box">
          <div class="playdish" :class="[playStatus?'songplay':'songstop']">
            <img src="@/assets/images/stick.png" alt="">
          </div>
        </div>
        <div class="dishList">
          <div class="dish" :class="[playStatus?'display':'dishstop']" v-if="playItem">
            <img class="playbg" src="@/assets/images/cover.png" alt="">
            <img  src="@/assets/images/light.png" alt="">
            <img class="playimg" :src="playItem[0].al.picUrl" alt="">
          </div>
        </div>
      <div class="option">
        <i class="iconfont">&#xe66a;</i>
        <i class="iconfont">&#xe65b;</i>
        <i class="iconfont">&#xe98f;</i>
        <div>
          <i class="iconfont">&#xe65d;</i>
        </div>
        <i class="iconfont">&#xe66c;</i>
      </div>
    </div>
</template>

<style scoped>
  .dish-box{
    z-index: 99;
    width: 100%;
    position: relative;
  }
  .playdish{
    width: 1.6rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    
    transform-origin: .2rem .2rem;
    transition: all .5s; 
    z-index: 999;
  }
  .songplay{
    transform: rotate(10deg);
  }
  .songstop{
    transform: rotate(-20deg);
  }
  .playdish img{
    width: 100%;
  }
  .dishList{
    padding-top: 1.5rem;
    width: 100%;
   
  }
  .dish{  
    width: 90%;
    margin: 0 auto;
    height: 100%;
    position: relative;
    z-index: 9;
    animation: circle 20s infinite linear;
  }

  .dishplay{  
    animation-play-state: running;
  }

  .dishstop{
    animation-play-state: paused;
  }
  .dish>img{
    width: 100%;
    z-index:5;
  }
  .playimg{
    width: 65%!important;
    position: absolute;
    left: 50%;
    border-radius: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 1!important;
  }
  .playbg{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99;
  }
 @keyframes circle {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
.option{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1.2rem;
  z-index: 999;
  position: fixed;
  width: 100%;
  bottom: 2.3rem;

}
.option div{
  z-index: 999;
}
.option i{
  color: #fff;
  font-size: .4rem;
  z-index: 999;
}
</style>

<script>
export default {
  name: 'dish',
  data(){
    return{
      
    }
  },
  components: {
    
  },
  methods:{
    show (){
      
      this.$emit('show','lyric')
    }
  },
  computed:{

    playItem () {
      let list=this.$store.state.playList;
      let playing=list.filter(item=>item.id==this.$store.state.playId)
      return playing
    },
    playId () {
      return this.$store.state.playId
    },
    playStatus () {
      return this.$store.state.playStatus
    }
  },
  watch:{
  },
  beforeRouteEnter (to,from,next){
      next()
  }
  
}
</script>
