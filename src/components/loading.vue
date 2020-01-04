<template>
  <div class="loading" v-show="isLoading" >
      <div class="c1"></div>
      <div class="c2"></div>
      <div class="c3"></div>
      <div class="c4"></div>
      <span>正在努力加载中...</span>

  </div>
</template>

<style scoped>
  .loading{
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 20px;
    width: 100%;
    z-index: 99999;
    background-color: #ffffff;
  }
  .loading>span{
    margin-left: .15rem;
    font-size: .22rem;
    color: #c1c1c1;
  }
  .loading>div{
    height: 15px;
    width: 2px;
    background-color: #ff3225;
    margin-left: .1rem;
    
  }
  .c1{
    animation:anim .8s linear infinite;
  }
  .c2{
    animation:anim .7s linear infinite;
  }
  .c3{
    animation:anim .6s linear infinite;
  }
  .c4{
    animation:anim .5s linear infinite;
  }
  @keyframes anim{
    0%{
      height: 5px;
    }
    100%{
      height: 15px;
    }
  }
</style>

<script>
import bottomList from '@/components/bottomList'
export default {
  name: 'loading',
  data(){
    return{
      
    }
  },
  components: {
    
  },
  methods:{
   
  },
  computed:{
    isLoading(){
      return this.$store.state.isLoading
    }
  }


}
</script>
