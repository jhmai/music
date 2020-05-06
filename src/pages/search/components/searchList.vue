<template>
  <div class="searchList">
    <span class="title">热搜榜</span>
    <ul class="list">
      <li class="search-item" v-for="(item,index) in hotList" @click='handleSearch(item.searchWord)'>
        <span class="sort" :class="[index<3?'red':'']">{{index+1}}</span>
        <div class="song-info">
          <div class="info-top">
            <span>{{item.searchWord}}</span>
            <img class="icon" :src="item.iconUrl" alt="">
          </div>
          <div class="info-bottom">
            <span>{{item.content}}</span>
          </div>
        </div>
        <span class="num">{{item.score}}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.searchList{
  width: 100%;
}
.title{
  margin: .2rem .25rem;
  font-size: .26rem;
  display: block;
}
.search-item{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .15rem;
}
.song-info{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: .15rem;
}
.info-top{
  display: flex;
  align-items: center;
  margin-bottom: .1rem;
  font-size: .3rem;
  span{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.info-bottom{
  font-size: .26rem;
  color: #c1c1c1;
  span{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.icon{
  height: .3rem;
  margin-left: .2rem;
}
.red{
  color: red;
}
.sort{
  font-size: .28rem;
  margin: 0 .2rem;
}
.num{
  font-size: .24rem;
  color: #c1c1c1;
}
</style>

<script>
export default {
  name: 'search',
  data(){
    return{
      
    }
  },
  props:{
    hotList:{
      type:Array
    }
  },
  components: {
    
  },
  methods:{
  	handleSearch(keyword){
      this.$emit('search',keyword)
    }
  },
  created() {
  	
  },
  mounted () {
    
  }
}

</script>
