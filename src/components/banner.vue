<template>
  <div class="banner">
    <swiper :options="swiperOption" ref="mySwiper1" class="bannerBox" v-if='banner.length'>
      <swiper-slide v-for="(item,index) in banner" :key='index'>
        <img :src="item.imageUrl" alt="">
      </swiper-slide>

      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<style scoped>
  .banner{
    z-index: 99;
    width: 100%;
  }
  .bannerBox{
    width: 100%;
    height: 2.6rem;
  }
  img{
    width: 94%;
  }
  .swiper-slide{
    display: flex;
    justify-content: center;
  }
  .swiper-pagination-bullet-active{
    background-color: rgb(221, 0, 27)!important;
  }


</style>
<script>
export default {
  name: 'banner',
  components: {

  },
  data(){
    return{
      swiperOption: {
        notNextTick: false,      
        autoplay: {         
          delay: 1000     
        },
        loop:true,
        speed:500,
        pagination: {
          el: ".swiper-pagination", 
          type: "bullets",
        }
      },
    }
  },
  props:{
    banner:{
      type:Array
    }
  },
  methods:{
    click() {

    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper1.swiper
    }
  },
  mounted() {
    
  }

  
}
</script>
