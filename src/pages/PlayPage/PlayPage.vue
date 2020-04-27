<template>
  <div class="playPage">
      <div class="content">
        <div class="top">
          <div class="header">
            <div class="left" @click="back()">
                <i class="iconfont" style="font-size: .4rem;">&#xe65e;</i>
            </div>
            <div class="center">
              <span class="songname">{{playItem[0].name}}</span>
              <span class="singer">{{playItem[0].ar[0].name}}</span>
            </div>
            <div class="right">
              <i class="iconfont" style="margin-right: .4rem;">&#xe607;</i>
              <i class="iconfont" >&#xe65c;</i>
            </div>
          </div>
        </div>
      <dish v-show="show=='dish'" @show="showContent"></dish>
      <lyric v-show="show=='lyric'"  :lyric="lyric" @show="showContent"></lyric>
      <div class="progress-line">
        <span class="currenTime">{{time}}</span>
        <div class="progress" @click="to" ref="progress">
          <div class="current" :style="{width:progress}">
            <div class="currentPoint" @touchmove="move" ref="currentPoint" @touchend="end"></div>
          </div>
          
        </div>
        <span class="total">{{totalTime}}</span>
      </div>
    </div> 

    <div class="optionB">
      <i class="iconfont">&#xe600;</i>
      <i class="iconfont" @click="pre()">&#xe663;</i>
      <i class="iconfont play" @click="play()" v-html="icon"></i>
      <i class="iconfont" @click="next()">&#xe668;</i>
      <i class="iconfont" @click.self.stop="side">&#xe664;</i>
    </div>  

      <div class="bgImg" :style="{backgroundImage:'url('+playItem[0].al.picUrl+')',backgroundSize:'cover'}"></div>
      <div class="bgfultter"></div>

      <bottom-list ref="bottomList"></bottom-list>
  </div>
</template>

<style scoped>
.playPage{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content{
  
  width: 100%;
  height: 100%;
}
.top{
    width: 100%;
    height: 1rem;
    padding-bottom: 1rem;
    background: transparent;
    z-index: 9;
  }
  /*.header{
    width: 100%;
    height: 1rem;
    position: fixed;
    display: flex;
    align-items: center;
    z-index: 999;
  }*/
  .header{
    width: 100%;
    height: 1rem;
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    z-index: 9;
    color: #fff;
  }
  .left{
    width: 1rem;
    padding-left: .2rem;
  }
  .center{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    color: #fff;
  }
  .right{
    margin-right: .2rem;
  }
  .songname{
    font-size: .28rem;
  }
  .singer{
    font-size: .22rem;
  }
  .bgfultter{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.41);
    z-index: 2;
  }
  
.progress-line{
  display: flex;
  padding: 0 .2rem;
  margin-top: .35rem;
  align-items: center;
  z-index: 99;
  position: fixed;
  width: 100%;
  bottom: 1.6rem;

}
.progress-line span{
  z-index: 99;
  color: #eee;
}
.progress{
  flex: 1;
  position: relative;
  height: 2px;
  background-color: #eeeeee;
  margin: 0 .25rem;
  z-index: 99;
}
.current{
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background-color: #fff;
  z-index: 99;
}
.currentPoint{
  width: 6px;
  height: 6px;
  border-radius: 50px;
  background-color: #fff;
  position: absolute;
  top: 1px;
  right: -1px;
  transform: translateY(-50%);
  z-index: 99;
}
.bgImg{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  filter:blur(100px);
}
.optionB{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  height: 1.6rem;
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  color: #fff;
  
}
.optionB i{
  font-size: .45rem;
}
.optionB .play{
  font-size: .75rem;
}
</style>

<script>
import bottomList from '@/components/bottomList'
import dish from './components/dish'
import lyric from './components/lyric'
export default {
  name: 'playPage',
  data(){
    return{
      color:'#f2826a',
      icon:'&#xe665;',
      percent:0,
      progress:'',
      lyric:'',
      show:'dish',
      time:''
    }
  },
  components: {
    bottomList,
    dish,
    lyric
  },
  methods:{
    to (e){
      
      this.percent=(e.clientX-this.$refs.progress.offsetLeft)/this.$refs.progress.offsetWidth
      this.$store.commit('currentTime',this.$store.state.totalTime*this.percent)
      this.$store.commit('jump',this.$store.state.totalTime*this.percent)
      console.log(this.$store.state.jump)
    },
    move (e) {
      if ((e.targetTouches[0].clientX-this.$refs.progress.offsetLeft)<this.$refs.progress.offsetWidth) {
        this.progress=(e.targetTouches[0].clientX-this.$refs.progress.offsetLeft)/this.$refs.progress.offsetWidth*100+'%'
      }
       
    },
    end () {
      if (this.$refs.currentPoint.offsetLeft>0) {
        this.percent=this.$refs.currentPoint.offsetLeft/this.$refs.progress.offsetWidth
        this.$store.commit('jump',this.$store.state.totalTime*this.percent)
        this.$store.commit('currentTime',this.$store.state.totalTime*this.percent)
        console.log(this.$store.state.jump)
      }
      
    },
    side () {
      this.$refs.bottomList.close()
    },
    back (){
      this.$router.go(-1);
    },
    pre (){
      this.skip(-1)
    },
    next (){
      this.skip(1)
    },
    skip(index){
      let currentList=this.$store.state.playList;
      let playId=this.$store.state.playId;
      let cIndex=currentList.findIndex(function(item){
          return item.id==playId;
      })
      if (cIndex!==currentList.length) {
        this.$store.commit('play',currentList[cIndex+index].id)
        this.$store.commit('changeStatus',1)
        this.icon='&#xe665;'
      } 
    },
    play () {
    // console.log(this.$refs.audio.duration)
    //  this.$refs.audio.currentTime=this.$refs.audio.duration-1;
      if (this.$store.state.playStatus) {
        this.$store.commit('changeStatus',0)
        this.icon='&#xe667;'
      }else{
        this.$store.commit('changeStatus',1)
        this.icon='&#xe665;'
      }
      
    },
    showContent (data) {
      console.log(data)
      this.show=data;
    }
  },
  computed:{
    totalTime () {
      // return this.$store.state.totalTime
      return this.utils.formatTime(this.$store.state.totalTime)
    },
    playItem () {
      let list=this.$store.state.playList;
      let playing=list.filter(item=>item.id==this.$store.state.playId)
      if (!playing[0].al) {
          playing[0].al=playing[0].album;
        }
  
        if (!playing[0].ar) {
          playing[0].ar=playing[0].artists
        }


      return playing
    },
    playId () {
      return this.$store.state.playId
    },
    currentTime () {

      return this.$store.state.currentTime
    },
    playStatus () {
      return this.$store.state.playStatus
    },
    // jump () {
    //   return this.$store.state.jump
    // }
  },
  watch:{
    currentTime (curval,oldval){
      this.percent=this.$store.state.currentTime/this.$store.state.totalTime
      this.progress=this.$store.state.currentTime/this.$store.state.totalTime*100+'%';
      this.time=this.utils.formatTime(curval)
    },
    // jump (curval,oldval){
    //   this.percent=this.$store.state.jump/this.$store.state.totalTime
    //   this.progress=this.$store.state.jump/this.$store.state.totalTime*100+'%';
    //   // console.log(this.percent)
    // },
    playId (curval,oldval){
      
      this.axios.get('/lyric?id='+this.playId).then(res=>{
        this.lyric=res.data.lrc.lyric.replace(/\r?\n|\r/gm,"")
      })
    }
  },
  beforeRouteEnter (to,from,next){
      next()
  },
  mounted () {

    this.axios.get('/lyric?id='+this.playId).then(res=>{

        this.lyric=res.data.lrc.lyric.replace(/\r?\n|\r/gm,"")
      }) 
  }
  
}
</script>
