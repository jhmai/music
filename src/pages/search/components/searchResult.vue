<template>
  <div class="searchResult">
    <ul class="song-list">
      <li class="song-item" v-for='item in searchList' @click='play(item.id)'>
        <div class="item-left">
          <div class="song-info">
            <span class="song-name">{{item.name}}</span>
            <span class="singer">{{item.artists[0].name}}-{{item.album.name}}</span>
          </div>
        </div>
        <div class="item-right">
          <i class="iconfont">&#xe65f;</i>
          <i class="iconfont">&#xe690;</i>
        </div>
      </li>
    </ul>
    <loading></loading>
  </div>
</template>

<style lang="less" scoped>
.searchResult{
  width: 100%;
}
.song-list{
  width: 100%;
  height: 100%;
}
.song-item{
  width: 100%;
  padding: .2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.item-left{
  display: flex;
  flex: 1;
  overflow: hidden;
  padding-right: .2rem;
  img{
    width: .75rem;
    height: .75rem;
    margin-right: .15rem;
  }
  .song-info{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: .03rem 0;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    span:first-child{
      font-size:.28rem;
      color: #000;
      width: 100%;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      margin-bottom: .1rem;
      color: #0da7fb;
    }
    span:last-child{
      font-size:.24rem;
      color: #ccc;
      width: 100%;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }

  }
}
.item-right{
  display: flex;
  align-items: center;
  flex-shrink: 0;
  i{
    margin-right: .2rem;
    color: #ababab;
  }
}
</style>

<script>
import loading from '@/components/loading.vue'
export default {
  name: 'search',
  data(){
    return{
      list:[]
    }
  },
  props:{
    searchList:{
      type:Array
    }
  },
  components: {
    
  },
  methods:{
  	play (id){
      
      this.axios.get('/song/detail?ids='+id).then(res=>{
          this.$store.commit('addSong',res.data.songs[0])
          this.$router.push('/playpage')
      })
    }
  },
  created() {
  	
  },
  mounted () {
    
  },
  computed:{
    playList (){
      return this.$store.state.playList
    },
    playing (){
      return this.$store.state.playId
    }
  }
}

</script>
