<template>
  <div class="find">
    <div class="content">
      <banner :banner='bannerList'></banner>
      <options :optionsList='optionsList'></options>
      <div class="songSheet">
        <div class="sheetTop">
          <span class="left">推荐歌单</span>
          <span class="right">歌单广场</span>
        </div>
        <recommend :recommendList="recommendList"></recommend>
      </div>
    </div>  
  </div>
</template>

<style scoped>
  .find{
    font-size: .35rem;
    height: 100%;
    width: 100%;
    position: fixed;
  }
  .content{
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  .songSheet{
    width: 100%;
    padding: .3rem .2rem;
  }
  .sheetTop{
    display: flex;
    justify-content: space-between;
  }
  .left{
    font-size: .32rem;
    font-weight: bold;
  }
  .right{
    font-size: .23rem;
    border: 1px solid #eeeeee;
    border-radius: 50px;
    padding: .05rem .25rem;
  }

</style>

<script>
import banner from '@/components/banner.vue'
import options from '@/components/options.vue'
import recommend from './components/recommend.vue'
export default {
  name: 'Find',
  data(){
    return{
      bannerList:[],
      recommendList:[],
      optionsList:[{
        icon:'&#xe603;',
        title:'每日推荐',
        link:'/recommendList'
      },
      {
        icon:'&#xe602;',
        title:'歌单',
        link:'/songSheet'
      },
      {
        icon:'&#xe604;',
        title:'排行榜',
        link:''
      },
      {
        icon:'&#xe601;',
        title:'电台',
        link:''
      },
      {
        icon:'&#xe634;',
        title:'私人FM',
        link:''
      },
      ]
    }
  },
  components: {
    banner,
    options,
    recommend
  },
  methods:{
  	requestBanner () {
      this.axios.post('/banner').then(res=>{
        this.bannerList=res.data.banners;
        console.log(res.data.banners)
      })
    },
    requestPersonalized(){
      this.axios.post('/personalized?limit=6').then(res=>{
        this.recommendList=res.data.result;
      })
    }
  },
  created() {
  	this.requestBanner()
    this.requestPersonalized()
  },
  mounted () {
    
  }
}
</script>
