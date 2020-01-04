<template>
    <div style="height: 100%;">
     <yd-layout ref='content'>
        <yd-navbar slot="navbar" class="bar">
            <div slot="left" @click="side">
                <!-- <yd-icon name="type" size=".3rem" color="#000000"></yd-icon> -->
                <i class="iconfont">&#xe70d;</i>
            </div>
            <div slot="center">
                <div class="top-list">
                  <div  class="my" :class="{'active':pageIndex==0}" @click='toPage(0)'>我的</div>
                  <div class="find" :class="{'active':pageIndex==1}" @click='toPage(1)'>发现</div>
                  <div class="my">云村</div>
                  <div class="my">视频</div>
                </div>
            </div>
            <div slot="right">
              <!-- <yd-icon name="search" size=".3rem" color="#000000"></yd-icon> -->
              <i class="iconfont">&#xe607;</i>
            </div>
        </yd-navbar>
        

        <swiper :options="swiperOption" ref="mySwiper" @slideChangeTransitionEnd='changePage()'>
          <!-- slides -->

          <swiper-slide>
            <router-view ></router-view>
            
          </swiper-slide>
          <swiper-slide>
            <router-view name='find'></router-view>
            
          </swiper-slide>
        </swiper>

        <sidebar ref="sidebar"></sidebar>
    </yd-layout>
  </div>
    


</template>


<style scoped>
  .swiper-container{
    height: 100%;
  }
  .bar{
    background-color: #ffffff!important;
  }
  .yd-back-icon:before, .yd-next-icon:before{
    color: #fff!important;
  }
  i{
    font-size: .4rem;
    color: #908d8d;
  }
  .top-list{
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
  .yd-navbar-center div{
    width: 100%;
    color: #b1b1b1;
    font-size: .3rem;
  }
  .yd-navbar-item div{
    padding-right: .35rem;
  }
  .active{
    color: #000000!important;
    font-weight: bold;
    font-size: .32rem!important;
  }
  .yd-scrollview:after{
    height: 0;
  }
  
</style>
<script>
import sidebar from '@/components/sidebar'
export default {
  name: 'home',
  components: {
    sidebar
  },
  data(){
    return{
      swiperOption: {
          noSwiping : true,
          noSwipingSelector : '.stop-swiping',
        },
        pageIndex:0
    }
  },
  methods:{
  	
    toPage (page) {
      this.swiper.slideTo(page, 300, false)
      this.pageIndex=page;
    },

    changePage () {
      
      this.pageIndex=this.swiper.realIndex;
      /*this.$refs.content.$refs.scrollView.scrollTop=0
      console.log(this.$refs.content.$refs.scrollView.scrollTop)*/
    },

    side () {
      this.$refs.sidebar.close()
    }
  },
  created() {
  	
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.$refs.mySwiper.swiper)
    this.swiper.slideTo(0, 1000, false)
    
  },
  beforeRouteEnter(to,from,next){
    
    console.log(from.meta)
    next()
  },
}
</script>
