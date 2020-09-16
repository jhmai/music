<template>
	 <div class="songSheet">
	 	<div class="header" ref='header'>
	 		<i class="iconfont" @click='back'>&#xe65e;</i>
	 		<span class="title">歌单广场</span>
	 	</div>
	 	<div class="scrollview" ref='scrollview' @scroll='handelScroll'>
	 		<div class="swiper-banner">
	 			<swiper ref="mySwiper" :options="swiperOptions" v-if="topSheet.length">
				    <swiper-slide  v-for="item in topSheet" :key='item.id' tag='swiper-slide'>
				    	<router-link class="swiper-box" :to="'/songList?id='+item.id" tag='div'>
				    		<img :src="item.coverImgUrl" alt="">
				    		<div class="desc">{{item.name}}</div>
				    		<div class="num">
				    			<i class="iconfont">&#xe656;</i>
				    			<span>{{item.playCount}}</span>
				    		</div>
				    	</router-link>
				    </swiper-slide>
				 </swiper>
	 		</div>
	 		
			 <div class="sheet-list">
			 	<ul class="list">
			 		<router-link :to="'/songList?id='+item.id" class="sheet-item"  v-for="item in sheet" tag='li'>
			 			<img :src="item.coverImgUrl" alt="">
			 			<p>{{item.name}}</p>
			 			<div class="num">
			    			<i class="iconfont">&#xe656;</i>
			    			<span>{{item.playCount}}</span>
			    		</div>
			 		</router-link>
				
			 	</ul>
			 </div>
	 		<loading></loading>
	 	</div>
	 </div>
</template>
<style lang="less" scoped>
.songSheet{
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
.swiper-banner{
	height:4.5rem;
}
.swiper-box{
	position: relative;
	width: 100%;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 0 7px 0px #ccc;
	display: flex;
	flex-direction: column;
	justify-content: center;
	img{
		width: 100%;
		height: auto;
		border-radius: 8px 8px 0 0;
	}
}
.num{
	position: absolute;
	display: flex;
	align-items: center;
	line-height: .5rem;
	font-size: .22rem;
	color: #fff;
	right: .1rem;
	top: .05rem;
	span{
		margin-left: .05rem;
	}
	i{
		font-size: .25rem;
	}
}
.desc{
	width: 100%;
	background-color: #fff;
	padding: .15rem;
	font-size: .22rem;
	text-align: left;
	overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
}
.swiper-container {
  width: 100%;
  height: 100%;
  padding: .5rem 0;
}
.swiper-slide {
	text-align: center;
	font-size: 18px;
	background: #fff;
	/* Center slide text vertically */
	display: -webkit-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	-webkit-justify-content: center;
	justify-content: center;
	-webkit-box-align: center;
	-ms-flex-align: center;
	-webkit-align-items: center;
	align-items: center;
	transition: 300ms;
	transform: scale(0.8);
}
.swiper-slide-active,.swiper-slide-duplicate-active{
    transform: scale(1.1);
}
.sheet-list{
	width: 100%;
}
.list{
	width: 100%;
	display: flex;
	padding: .15rem .26rem;
	flex-wrap: wrap;
	.sheet-item{
		position: relative;
		display: flex;
		flex-direction: column;
		width: 31.1%;
		margin-right: .21rem;
		margin-bottom: .25rem;
		&:nth-child(3n){
			margin-right: 0;
		}
		img{
			width: 100%;
			height: 2rem;
			border-radius: 5px;
			margin-bottom: .15rem;
		}
		p{
			width: 100%;
			overflow:hidden; 
		    text-overflow:ellipsis;
		    display:-webkit-box;
		    -webkit-box-orient:vertical;
		    -webkit-line-clamp:2; 
		}
	}
}
</style>
<script>
import loading from '@/components/loading.vue'
export default{
	name:'songSheet',
	data (){
		return{
			sheet:[],
			topSheet:[],
			page:1,
			swiperOptions: {
				notNextTick: false, 
				loop:true,
	            pagination: {
	                el: '.swiper-pagination',
	                clickable: true,
	            },
	          	slidesPerView: 3,
            	spaceBetween: 10,
  				centeredSlides: true,
  				
	          // Some Swiper option/callback...
	        },
	        isLoading:false,
	        scrollTop:''
		}
	},
	methods:{
		back(){
			this.$router.go(-1)
		},
		requestSheet(callback){
			this.isLoading=true;
			this.axios.get('/top/playlist?offset='+this.page).then(res=>{
				console.log(res.data)
				let list=res.data.playlists;
				for (var i = 0; i < list.length; i++) {
					if (i<3&&this.topSheet.length<3) {
						list[i].playCount=this.utils.conversion(list[i].playCount)
						this.topSheet.push(list[i])
					}else{
						list[i].playCount=this.utils.conversion(list[i].playCount)
						this.sheet.push(list[i])
					}
				}
				// callback&&callback()
				this.$nextTick(()=>{
					callback
					this.isLoading=false;
				})	
			})
		},
		slide(){
			this.swiper.slideTo(1, 1000, false)
		},
		handelScroll(){
			let scroll=this.$refs.scrollview.scrollTop;
			let scrollviewSH=this.$refs.scrollview.scrollHeight;
			let scrollviewH=this.$refs.scrollview.offsetHeight;
			if (this.isLoading==false) {
				if (scrollviewSH-scroll-scrollviewH<100) {
				this.page++;
				this.requestSheet();
			}
			}
			
			
		}

	},
	components:{
		loading
	},
	computed:{
		swiper() {
	        return this.$refs.mySwiper.swiper
	      }
	},
	mounted (){
		this.requestSheet();
	},
	beforeRouteLeave (to,from,next){
    this.scrollTop=this.$refs.scrollview.scrollTop;
    if (to.name != "playpage"&&to.name!='songlist') {
	      this.$store.commit("noKeepAlive", "songSheet");
	    }
    next()
  },
  activated(){
  	
  	this.$nextTick(()=>{
  		this.$refs.scrollview.scrollTop=this.scrollTop
  	})
  	
  }
}

</script>
