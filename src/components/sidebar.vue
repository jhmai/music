<template>
  <div class="sidebar" v-if='isShow' @click.self="close()">
     <div class="sidebar-content" :class="isHidden==1?'close':'open'">
       <loading></loading>
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
    z-index: 999999;
  }
  .sidebar-content{
    height: 100%;
    overflow: scroll;
    background-color: #ffffff;
    transition: all .3s;
  }
  .open{
    width: 70%;
  }
  .close{
    width: 0;
  }

</style>
<script>
import loading from '@/components/loading'
export default {
  name: 'sidebar',
  components: {
    loading
  },
  data(){
    return{
      isShow:false,
      isHidden:1
    }
  },
  methods:{
    close () {
      console.log(111)
      
      

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
      
      
    }
  }
  
}
</script>
