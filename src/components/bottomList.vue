<template>
  <div class="sidebar" v-if='isShow' @click.self.stop="close()">
     <div class="sidebar-content" :class="isHidden==1?'close':'open'">
       <div class="list-title">
        <div class="left">
          <i class="iconfont">&#xe600;</i>
          <span>循环列表(63)</span>
        </div>
         <div class="right">
            <i class="iconfont">&#xe61d;</i>
            <span>收藏全部</span>
            <i class="iconfont">&#xe632;</i>
         </div>
       </div>
        <div class="list">
          <ul>
            <li v-for="item in songList" @click="change(item.id)" :class="[item.id==playId?'current':'']">
              <div>
                <i class="iconfont" v-if="item.id==playId" style="color:#EF5B59;margin-right: .12rem;">&#xe66d;</i>
                <span class="song-name">{{item.name}} </span>
                <span class="singer"> - {{item.ar[0].name}}</span>
              </div>
              <i class="iconfont" @click.stop="remove(item.id)">&#xe626;</i>
            </li>
          </ul>
        </div>
     </div>

  </div>
</template>


<style scoped>
  .sidebar{
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0,0.3);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99999;
  }
  .sidebar-content{
    width: 100%;
    overflow: scroll;
    background-color: #ffffff;
    transition: all .2s;
    position: fixed;
    bottom: 0;
    border-radius: 15px 15px 0 0;
    
  }
  .open{
    height: 50%;

  }
  .close{
    height: 0;
  }
  .list-title{
    display: flex;
    padding:.3rem;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    justify-content: space-between;
    font-size: .27rem;

  }
  .left{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left>span{
    margin-left: .15rem;
  }
  .right{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right span{
    margin-right: .4rem;
    margin-left: .1rem;
  }
  .list{
    padding: 0 .2rem;
    overflow: scroll;
    height: 100%;
    padding-bottom: 1rem;
  }
  .list li{
    display: flex;
    justify-content: space-between;
    padding: .3rem 0;
    font-size: .28rem;
  }
  .list li>div{
    width: 70%;
    max-width: 70%;
    /*flex-wrap: nowrap;*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .singer{
    font-size: .22rem;
    color: #cccccc;
  }
  .list li i{
    color: #cccccc;
  }
  .current{
    color: #EF5B59!important;
  }
  .current .singer{
    color: #EF5B59!important;
  }

</style>
<script>
import { mapState } from 'vuex'
export default {
  name: 'bottomList',
  components: {

  },
  data(){
    return{
      isShow:false,
      isHidden:1
    }
  },
  methods:{
    close () {
      console.log(this.playId)
      
      if (this.isShow) {
        this.isHidden=!this.isHidden;
        setTimeout(()=> {
          this.isShow=false;
        },300)
      }else{
        this.isShow=true;
        this.isHidden=1;
        setTimeout(()=> {
          this.isHidden=0;
        },100)
        
      }
    },
    change (id) {
      this.$store.commit('play',id)
    },
    remove(id){
      this.$store.commit('removeSong',id)
    }
  },
  computed:{
    // songList () {
    //   return this.$store.state.playList
    // },
    // playId () {
    //   return this.$store.state.playId
    // },
    ...mapState({
      playId:'playId',
      songList:'playList'
    })
  }
  
}
</script>
