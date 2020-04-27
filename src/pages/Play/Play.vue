<template>
  <div class="content" v-show="playShow">
    <div class="play" @click="toPage">
      <img :src="picUrl" alt="">
      <div class="play-info">
          <span class="song">{{name}}</span>
          <span class="lyric">{{author}}</span>
          
      </div>
      <div class="option">
        <i @click.self.stop='play()' class="iconfont" v-html='icon'></i>
        <i class="iconfont" @click.self.stop="side">&#xe664;</i>
      </div>
    </div>

      <bottom-list ref="bottomList"></bottom-list>
      <audio autoplay :src="url" ref='audio' @ended='onEnd' @timeupdate="onTimeupdate" @durationchange="durationchange"></audio>
  </div>
</template>

<style scoped>
.play{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: .9rem;
  background-color: #fff;
  border-top: 1px solid #eeeeee;
  z-index: 999;
  display: flex;
  align-items: center;
  padding-left: .2rem;
}
.play>img{
  width: .6rem;
  height: .6rem;
  max-height: .6rem;
  border-radius: 50px;
}
.play-info{
  margin-left: .2rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}
.song{
  font-size: .25rem;
}
.lyric{
  font-size: .21rem;
  color: #eeeeee;
}
.option i{
  font-size: .4rem;
  margin-right: .25rem;
}
</style>

<script>
import bottomList from '@/components/bottomList'
export default {
  name: 'Play',
  data(){
    return{
      url:'',
      picUrl:'',
      name:'',
      author:'',
      icon:'&#xe665;'
    }
  },
  components: {
    bottomList
  },
  methods:{
    side () {
      this.$refs.bottomList.close()
    },
  	play () {
      
    // console.log(this.$refs.audio.duration)
    //  this.$refs.audio.currentTime=this.$refs.audio.duration-1;
      if (this.$store.state.playStatus) {
        this.$refs.audio.pause()
        this.$store.commit('changeStatus',0)
        this.icon='&#xe667;'
      }else{
        this.$refs.audio.play()
        this.$store.commit('changeStatus',1)
        this.icon='&#xe665;'
      }
      
    },
    onEnd () {
      let currentList=this.$store.state.playList;
      let playId=this.$store.state.playId;
      let cIndex=currentList.findIndex(function(item){
          return item.id==playId;
      })
      this.$store.commit('play',currentList[cIndex+1].id)
    },
    toPage () {
      this.$router.push('/playpage')
    },
    onTimeupdate (e) {
      // console.log(this.$refs.audio.currentTime);
      this.$store.commit('currentTime',this.$refs.audio.currentTime)
      // this.$store.dispatch('usecurrentTime',this.$refs.audio.currentTime)
    },
    durationchange(e){
      // console.log(e.srcElement.duration)
      let totalTime=e.srcElement.duration;
      this.$store.commit('totalTime',totalTime)
    }
  },
  created() {
  	
  },
  mounted () {
    
  },
  computed:{
    playShow () {
      return this.$store.state.playShow
    },
    playId () {
      return this.$store.state.playId
    },
    currentTime (){
      // console.log(this.$refs.audio.currentTime)
      return this.$store.state.currentTime
    },
    playStatus(){
      return this.$store.state.playStatus
    },
    jump(){
      return this.$store.state.jump
    }

  },
  watch:{
      playId(curval,oldval){   
        this.axios.get('/song/url?id='+curval).then(res=>{
          // console.log(res.data.data[0].url)
          this.url=res.data.data[0].url
          if (this.url&&this.$route.name!=="playpage") {
            this.$store.commit('isplayShow',true)
          }
          
        })
        let list=this.$store.state.playList;
        let playing=list.filter(item=>item.id==this.playId)
        // console.log(playing[0].al.picUrl||playing[0].album.picUrl)
        this.name=playing[0].name;
        if (playing[0].al) {
          this.picUrl=playing[0].al.picUrl;
        }else{
          this.picUrl=playing[0].album.picUrl;
        }
        
        if (playing[0].ar) {
          this.author=playing[0].ar[0].name
        }else{
          this.author=playing[0].artists[0].name; 
        }
        // this.author=playing[0].ar[0].name||playing[0].artists[0].name;   

      },

      $route (to,from) {
         // console.log(to.path)
        if (to.path=='/playpage') {
          this.$store.commit('isplayShow',false)
        }else if (this.url){
          this.$store.commit('isplayShow',true)
        }
      },
      playStatus (curval,oldval) {
        if (curval==0) {
          this.$refs.audio.pause()
          this.icon='&#xe667;'
        }else{
          this.$refs.audio.play()
          this.icon='&#xe665;'
        }
      },
      jump () {
        
        this.$refs.audio.currentTime=this.$store.state.jump
      }
    }

}
</script>
