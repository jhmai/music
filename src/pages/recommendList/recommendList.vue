<template>
	 <div class="recommendList" :class="[isscroll?'scroll':'hidden']"  ref='recommendList'>
	 	<div class="header" ref='header'>
	 		<i class="iconfont" @click='back'>&#xe65e;</i>
	 		<span v-show='!isscroll' class="title">每日推荐</span>
	 	</div>
	 	<div class="background" :style="{filter:'blur('+blur+'px)'}">
	 		<img :src="backgroundUrl" alt="">
	 	</div>
	 	<div class="scrollview" @scroll='scorll()' ref='scrollview' :class="[isscroll?'hidden':'scroll']">
	 		<div class="scroll-top">
	 			<i class="iconfont">&#xe666;</i>
	 			<span>播放全部</span>
	 		</div>
	 		<div class="scroll-content">
	 			<ul class="song-list">
	 				<li class="song-item" v-for='item in songList' @click='play(item.id)'>
	 					<div class="item-left">
	 						<img :src="item.album.picUrl" alt="">
		 					<div class="song-info">
		 						<span class="song-name">{{item.name}}</span>
		 						<span class="singer">{{item.artists[0].name}}-{{item.album.name}}</span>
		 					</div>
	 					</div>
	 					
	 					<div class="item-right">
	 						<i class="iconfont">&#xe65f;</i>
	 						<i class="iconfont">&#xe690;</i>
	 					</div>
	 				</li>
	 			</ul>
	 		</div>
	 	</div>
	 </div>
</template>
<style lang="less" scoped>
.recommendList{
	position: relative;
	width: 100%;
	padding-top: 25vh;
	display: flex;
	flex-direction: column;
	background-color: #ccc;
}

.header{
	position: fixed;
	padding: .2rem;
	height: .65rem;
	display: flex;
	align-items: center;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 999;
	i{
		z-index: 99;
		color: #fff;
	}
}
.title{
	font-size: .3rem;
	color: #fff;
	margin-left: .3rem;
}
.background{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	/*filter:blur(0px);*/
	img{
		width: 100%;
		z-index: 1;
	}
}
.scrollview{
	height: 94vh;
	width: 100%;
	background-color: #fff;
	border-radius: 15px 15px 0 0;
	z-index: 999;
	position: relative;
	div{
		
	}
}
.hidden{
	overflow:hidden;
}
.scroll{
	overflow: scroll;
}
.scroll-top{
	width: 100%;
	height: .8rem;
	display: flex;
	align-items: center;
	line-height: .4rem;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 99999;
	background-color: #fff;
	i{
		font-size: .35rem;
		margin: 0 .2rem;
	}
	span{
		font-size: .28rem;
	}
}
.scroll-content{
	overflow: hidden;
}
.song-list{
	width: 100%;
}
.song-item{
	width: 100%;
	padding: .2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
}
.item-left{
	display: flex;
	flex: 1;
	overflow: hidden;
	padding-right: .2rem;
	img{
		width: .75rem;
		height: .75rem;
		margin-right: .15rem;
	}
	.song-info{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		padding: .03rem 0;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		span:first-child{
			font-size:.26rem;
			color: #000;
			width: 100%;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		span:last-child{
			font-size:.24rem;
			color: #ccc;
			width: 100%;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}

	}
}
.item-right{
	display: flex;
	align-items: center;
	flex-shrink: 0;
	i{
		margin-right: .2rem;
	}
}
</style>
<script>
export default{
	name:'recommendList',
	data (){
		return{
			backgroundUrl:'',
			songList:[],
			isscroll:true,
			clientH:'',
			blur:0
		}
	},
	methods:{
		back(){
			this.$router.go(-1)
		},
		scorll(){
			// console.log()
		},
		handleScroll(){
			let scroll=document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
			// console.log(scroll+':'+this.clientH*0.05+':'+(scroll>=this.clientH*0.05))
			this.blur=scroll*0.15
			if (scroll>=Math.floor(this.clientH*0.16)) {
				this.isscroll=false;
			}else{
				this.isscroll=true;
			}
		},
		play(id){
			console.log(id)
			this.$store.commit('play',id);
			this.$store.commit('changeSong',this.songList);
		}
	},
	mounted (){
		this.axios.get('/recommend/songs').then(res=>{
			console.log(res.data.recommend)
	  		res.data.recommend.forEach((item,index)=>{
	  			item.al=item.album;
	  			item.ar=item.artists;
	  		})
			this.songList=res.data.recommend
			console.log(this.songList)
			this.backgroundUrl=res.data.recommend[0].artists[0].img1v1Url
		})
		window.addEventListener('scroll', this.handleScroll)
		this.clientH=document.documentElement.clientHeight || document.body.clientHeight;
	}
}

</script>
