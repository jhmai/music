<template>
  <div class="songList">
      <div class="songItem" v-for="item in list" @click="to(item.id)">
        <div class="item-img">
          <img :src="item.picUrl" alt="">
          <div class="playNum">
            <i class="iconfont">&#xe656;</i>
            <span>{{item.playCount}}</span>
          </div>
        </div>
        <span class="song-name">{{item.name}}</span>
      </div>
  </div>
</template>

<style scoped>
  .songList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .songItem{
    width: 28%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: .3rem;
  }
  .item-img>img{
    width: 100%;
    border-radius: 8px;
  }
  .item-img{
    position: relative;
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
  .song-name{
    display: inline-block;
    width: 100%;
    font-size: .22rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>

<script>
export default {
  name: 'recommend',
  data(){
    return{
     
    }
  },
  components: {

  },
  methods:{
  	to (id) {
      this.$router.push({
        path:'/songlist',
        query:{
          id:id
        }
      })
    }
  },
  props:{
    recommendList:{
      type:Array
    }
  },
  created() {
  	
  },
  mounted () {

  },
  computed: {
    list:function() {
      var list=[]
      this.recommendList.forEach((value,index,arr)=>{
        var playCount=value.playCount
        value.playCount=this.utils.conversion(playCount);
        list=arr;
      })

      return list
    }
  }
}
</script>
