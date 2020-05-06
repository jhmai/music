<template>
  <div class="search">
     <div class="header" ref='header'>
        <i class="iconfont" @click='back'>&#xe65e;</i>
        <input type="text" class="keyword" :placeholder='showKeyword' v-model='keywords'>
        <i class="iconfont"@click='search(keywords)' >&#xe607;</i>
        <i class="iconfont singer">&#xe605;</i>
    </div>
    <div class="scrollview" ref='scrollview'>
      <search-list :hotList='hotList' v-if='!showSearch' @search='search'></search-list>
      <search-result :searchList='searchList' v-if='showSearch'></search-result>
    </div>
  </div>
</template>

<style lang="less" scoped>
.search{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.header{
  padding: .2rem;
  height: .85rem;
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 999;
  color: #000;
  i{
    z-index: 99;
    color: #000;
  }
}
.title{
  font-size: .3rem;
  color: #000;
  margin-left: .3rem;
}

.scrollview{
  flex: 1;
  width: 100%;
  background-color: #fff;
  z-index: 999;
  overflow-y: scroll;
}
.keyword{
  flex: 1;
  height: 100%;
  border: none;
  border-bottom: 1px solid #c1c1c1;
  margin-left: .35rem;
  font-size: .3rem;
  padding-left: .1rem;
}
.singer{
  margin: 0 .2rem 0 .3rem;
  font-size: .45rem;
}
</style>

<script>
import searchList from './components/searchList.vue'
import searchResult from './components/searchResult.vue'
export default {
  name: 'search',
  data(){
    return{
      hotList:[],
      keywords:'',
      showKeyword:'',
      searchList:[],
      showSearch:false
    }
  },
  components: {
    searchList,
    searchResult
  },
  methods:{
  	back(){
      if (this.showSearch) {
        this.showSearch=false
      }else{
        this.$router.go(-1)
      }
      
    },
    search(keyword){

      this.showSearch=true;
      // let keyword=this.keywords?this.keywords:this.showKeyword;

      if (keyword) {
        this.keywords=keyword;
      }

      if (!this.keywords) {
        this.keywords=this.showKeyword;
      }


      this.axios.get('/search?keywords='+this.keywords).then(res=>{
        console.log(res.data.result)
        res.data.result.songs.forEach((item,index)=>{
          item.al=item.album;
          item.ar=item.artists;
        })
        this.searchList=res.data.result.songs
      })
    }
  },
  created() {
  	
  },
  mounted () {
    this.axios.get('/search/hot/detail').then(res=>{
      console.log(res.data.data)
      this.hotList=res.data.data
    })
    this.axios.get('/search/default').then(res=>{
      console.log(res.data)
      this.showKeyword=res.data.data.showKeyword
    })
  }
}

</script>
