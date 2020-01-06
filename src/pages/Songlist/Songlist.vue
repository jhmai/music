<template>
  <div class="songList" ref="song" @scroll='handleScroll'>
        <div class="songList-top" :class="{zindex:fixed}">
          <div class="songList-header">
            <div class="left" @click="back()">
                <i class="iconfont" style="font-size: .4rem;">&#xe65e;</i>
            </div>
              <div class="center">
                <span>歌单</span>
                <p></p>
            </div>
            <div class="right">
              <i class="iconfont" style="margin-right: .4rem;">&#xe607;</i>
              <i class="iconfont" >&#xe690;</i>
            </div>
        </div>
      </div>
        <div class="main">
          <div class="listInfo" ref="listInfo" :style="{opacity:opacity}" >
            <div class="info-content">
                <div class="item-img">
                  <img :src="infoBg" alt="">
                  <div class="playNum">
                    <i class="iconfont">&#xe656;</i>
                    <span>{{playNum}}</span>
                  </div>
                </div>
                <div class="item-desc">
                  <span class="title">{{playlist.name}}</span>
                  <div class="creator" v-if="playlist.creator">
                    <img :src="playlist.creator.avatarUrl" alt="">
                    <span class="creator-name">{{playlist.creator.nickname}}</span>
                  </div>
                  <p>{{playlist.description}}</p>
                </div>
            </div>
            <div class="song-option">
              <div>
                <i class="iconfont">&#xe65d;</i>
                <span>123</span>
              </div>
              <div>
                <i class="iconfont">&#xe65c;</i>
                <span>123</span>
              </div>
              <div>
                <i class="iconfont">&#xe65b;</i>
                <span>下载</span>
              </div>
              <div>
                <i class="iconfont">&#xe65a;</i>
                <span>多选</span>
              </div>
            </div>
          </div>
          <div class="vip" ref='vip' :style="{opacity:opacity}" v-if="show">
            
              <div>
                <i class="iconfont">&#xe65a;</i>
                <span>含5首VIP专享歌曲</span>
              </div>
              <span>首开VIP仅5元</span>
            </div>
          <div class="list" :class="{fixed:fixed}">
            
            <div class="list-title">
              <div style="display: flex;align-items: center;">
                <i class="iconfont">&#xe666;</i>
                <div style="margin-left: .25rem;">播放全部
                  <span style="font-size: .25rem;color: #cccccc;">(共{{songlist.length}}首)</span>
                </div>
              </div>
              <div class="collection">
                <span>+ 收藏({{this.utils.conversion(playlist.subscribedCount)}})</span>
              </div>
            </div>
            <div class="play-list" ref='list'>
              <loading></loading>
              <ul ref='songLists'>
                <li v-for="(item,index) in songlist" @click="play(item.id)" :key='item.id'>
                  <div class="sort">{{index+1}}</div>
                  <div class="song-info">
                    <div class="song-name">{{item.name}}</div>
                    <div class="info">
                      <span>{{item.ar[0].name}}</span>
                    </div>
                  </div>
                  <i class="iconfont">&#xe666;</i>
                  <i class="iconfont">&#xe690;</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="songList-filter" :style="{backgroundImage: 'url(' + infoBg + ')', backgroundSize:'cover'}"></div>
        <div class="songList-bg" :style="{opacity:opacity}"></div>
        
  </div>
</template>

<style scoped>
  .songList{
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    color: #ffffff;
    overflow: visible;
  }
  .songList-top{
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
  .songList-header{
    width: 100%;
    height: 1rem;
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0,0,0,0.02);
  }
  .left{
    width: 1rem;
    padding-left: .2rem;
  }
  .center{

  }
  .right{
    margin-right: .2rem;
  }
  .main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    
  }
  .listInfo{
    width: 100%;
    max-height: 50%;
    z-index: 3;
  }
  .list{
    font-size: .35rem;
    min-height: 30vh;
  }
  i{
    color: #fff;
  }
  .songList-filter{
    position: absolute;
    width: 100%;
    height: 50vh;
    filter:blur(100px);
    top: 0;
    left: 0;
  }
  .songList-bg{
    position: absolute;
    width: 100%;
    height: 50vh;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.15);
    z-index: 2;
  }
  .item-img{
    width: 2.5rem;
    position: relative;
  }
  .item-img>img{
    width: 100%;
    border-radius: 8px;
  }
  .playNum{
    position: absolute;
    right: .1rem;
    top: .1rem;
    font-size: .21rem;
    color: #ffffff;
  }
  i{
    font-size: .18rem;
  }
  .info-content{
    padding: .3rem;
    display: flex;
  }
  .title{
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp:2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
  .item-desc{
    margin-left: .3rem;
    font-size: .32rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .creator{
    display: flex;
    align-items: center;
    font-size: .28rem;
  }
  .creator img{
    width: .5rem;
    height: .5rem;
    border-radius: 50px;
    margin-right: .15rem;
  }
  .item-desc p{
    font-size: .2rem;
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp:2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
  .song-option{
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .song-option i{
    font-size: .4rem;
  }
  .song-option span{
    font-size: .2rem;
  }
  .song-option div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .vip{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .25rem;
    padding: .25rem .3rem .5rem;
    font-size: .3rem;
    color: #000;
    background-color: #ffffff;
    z-index: 1;
    border-radius: 15px 15px 0 0;
    position: relative;
    top: .2rem;
  }
  .vip i{
    color: #f10707;
    font-size: .3rem;
  }
  .vip>div>span{
    margin-left: .15rem;
  }
  .vip>span{
    margin-left: .2rem;
    font-size: .2rem;
  }
  .list{
    position: relative;
   /* top: -.2rem;*/
    z-index: 999;
    background-color: #ffffff;
    border-radius: 15px 15px 0 0;
    color: #000;
    padding: .2rem;
    overflow: hidden;
  }
  .list-title{
    display: flex;
    justify-content: space-between;
    font-size: .33rem;
    padding: .25rem 0;
    z-index: 999;
  }
  .list-title i{
    color: #000000;
    font-size: .33rem;
  }
  .collection{
    color: #ffffff;
    font-size: .22rem;
    padding: .15rem;
    background-color: #fb0606;
    border-radius: 50px;
  }
  .play-list{
    overflow: hidden;
    z-index: 999;
    width: 100%;
  }
  .play-list li{
    display: flex;
    align-items: center;
    position: relative;
    padding: .2rem 0;
  }
  ul{
    z-index: 999;
  }
  .play-list i{
    color: #c5c5c5;
    font-size: .35rem;
    margin-right: .25rem;
  }
  .song-info{
    display: flex;
    flex-direction: column;
    margin-left: .5rem;
    flex: 1;
  }
  .song-name{
    font-size: .3rem;
  }
  .info{
    font-size: .24rem;
    color: #c5c5c5;
  }
  .sort{
    color: #c5c5c5;
    font-size: .32rem;
  }
  .fixed{
    max-height: 94vh;
    /*position: sticky;*/
    /*top: .9rem;*/
  }
  /*.fixed .list-title{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }*/
  .fixed .play-list{
    width: 100%;
    height: 94vh;
    overflow: scroll;
    padding-bottom: 2rem;
  }
  .zindex{

  }

</style>

<script>

export default {
  name: 'songlist',
  data(){
    return{
      infoBg:'',
      playCount:0,
      playlist:{},
      songlist:[],
      shoucang:'',
      opacity:1,
      show:1,
      fixed:0,
      scrollTop:''
    }
  },
  components: {
    
  },
  methods:{
    back () {
      this.$router.go(-1);

    },
    handleScroll () {
      
      let scroll=document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
      let height=this.$refs.listInfo.offsetHeight;
      let vheight=this.$refs.vip.offsetHeight;
      // console.log(document.documentElement.scrollTop)
      // console.log(this.$refs.listInfo.offsetHeight)
      if (scroll<=height) {
        this.opacity=1-(scroll/height)
        
      }else{
        this.opacity=0;
        
      }
      if (scroll>=height+vheight) {
        
        this.fixed=1;
      }else if(scroll<height+vheight){
        
        this.fixed=0;
      }
    },
    play (id) {
      this.$store.commit('changeSong',this.songlist)
      this.$store.commit('play',id)
    } 
  },
  mounted() {

    var id=this.$route.query.id
    this.axios.get('/playlist/detail?id='+id).then((res)=>{
      // console.log(res.data.playlist.coverImgUrl)
      this.infoBg=res.data.playlist.coverImgUrl;
      this.playCount=res.data.playlist.playCount;
      this.playlist=res.data.playlist;
      this.songlist=res.data.playlist.tracks;

    })
    
  },
  updated(){
    this.$nextTick(()=>{
      window.addEventListener('scroll', this.handleScroll);
      // this.$refs.song.addEventListener('scroll', this.handleScroll);
    })
  },
  activated () {
    var id=this.$route.query.id
    this.axios.get('/playlist/detail?id='+id).then((res)=>{
      // console.log(res.data.playlist.coverImgUrl)
      this.infoBg=res.data.playlist.coverImgUrl;
      this.playCount=res.data.playlist.playCount;
      this.playlist=res.data.playlist;
      this.songlist=res.data.playlist.tracks;

    })
    window.addEventListener('scroll', this.handleScroll)
  },
  computed:{
    playNum:function(){
      return this.utils.conversion(this.playCount)
    },
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  beforeRouteEnter(to,from,next){

    next(vm=>{
      console.log(vm.$route.meta.keepAlive)
      // vm.$refs.list.scrollTop=vm.scrollTop

      vm.$refs.list.scrollTop=vm.scrollTop
      console.log(vm.$refs.list.scrollTop=vm.scrollTop)
    })
  },
  beforeRouteLeave (to,from,next){
    
    if (to.name=='playpage') {
      this.scrollTop=this.$refs.list.scrollTop;
      this.$route.meta.keepAlive=true;
      
    }else{
      this.$route.meta.keepAlive=false;
      // this.$destroy();
    }
    next()
  },

  
}
</script>
