<template>
  <div id="app">

    	<transition :name='animationName' mode='out-in'>
		    <keep-alive>
		          <router-view v-if="$route.meta.keepAlive"></router-view>
		    </keep-alive>
		</transition> 
		<transition :name='animationName' mode='out-in'>   
		    <router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>  
		<play></play>
		
  </div>
</template>

<style lang="css">
	#app{
		position: relative;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #ffffff;
	}
	.faderight-enter-active{
	  animation: fadeInRight 0.3s;
	}
	.fadeleft-enter-active{
	  animation: fadeInLeft 0.3s;
	}
	.fadein-enter-active{
	  animation: fadeIn 0.5s;
	}
	.fadeup-enter-active{
	  animation: fadeInUp 0.5s;
	}
	.fadedown-enter-active{
	  animation: fadeOutDown .3s;
	}
	.yd-scrollview:after{
	    height: 0!important;
	 }
</style>
<script>
  import play from '@/pages/Play/Play.vue'
  export default {
  name: 'App',
  data () {
    return {
      animationName:'fade'
    }
  },
  watch:{
    $route(to, from) {
    	

	if (to.meta.index==10) {
		this.animationName='fadeup'
	}else if (from.meta.index==10) {
        this.animationName='fadedown'
      }else if (to.meta.index>from.meta.index) {
        this.animationName='faderight'
      }else if (to.meta.index==from.meta.index) {
         this.animationName='fadein'
      }else{
        this.animationName='fadeleft'
      }
    }
  },
  components:{
  	play
  }
}
</script>