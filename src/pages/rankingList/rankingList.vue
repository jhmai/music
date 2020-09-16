<template>
	 <div class="songSheet">
	 	<div class="header" ref='header'>
	 		<i class="iconfont" @click='back'>&#xe65e;</i>
	 		<span class="title">排行榜</span>
	 	</div>
	 	<div class="scrollview" ref='scrollview'>
	 		<div class="toplist">
	 			<span>官方榜</span>
	 			<ul>
	 				<li class="top-item" v-for='(item,index) in topList' @click='to(item.id)' :key='item.id'>
	 					<div class="item-left">
	 						<img :src="item.coverImgUrl" alt="">
	 						<span>{{item.updateFrequency}}</span>
	 					</div>
	 					<div class="item-right" >
	 						<p v-for='(song,indx1) in item.tracks'>{{indx1+1}}.{{song.first}} - {{song.second}}</p>
	 					</div>
	 				</li>
	 			</ul>
	 		</div>
	 		<div class="recommend">
	 			<span>推荐榜</span>
	 			<ul class="recommend-list">
	 				<li class="recommend-item" v-for='item in rankList' @click='to(item.id)' :key='item.id'>
	 					<div class="img">
	 						<img :src="item.coverImgUrl" alt="">
	 						<span>{{item.updateFrequency}}</span>
	 					</div>
	 					<span>{{item.name}}</span>
	 				</li>
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
	padding: .25rem;
}
.toplist{
	width: 100%;
	&>span{
		font-size: .3rem;
		font-weight: bold;
		display: block;
		margin-bottom: .15rem;
	}
	ul{
		width: 100%;
	}
}
.top-item{
	width: 100%;
	display: flex;
	margin-bottom: .1rem;
	overflow: hidden;
	position: relative;
	.item-left{
		width: 30%;
		flex-shrink: 0;
		img{
			width: 100%;
			border-radius: 5px;
		}
		span{
			position: absolute;
			left: .15rem;
			bottom: .1rem;
			font-size: .2rem;
			color: #fff;
		}
	}
	.item-right{
		width: 70%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: .2rem;
		font-size: .25rem;
		color: #787878;
		p{
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			word-wrap: normal;
		}
	}
}
.recommend{
	margin-top: .35rem;
	&>span{
		font-size: .3rem;
		font-weight: bold;
		display: block;
		margin-bottom: .15rem;
	}
}
.recommend-list{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

}
.recommend-item{
	width: 32%;
	display: flex;
	flex-direction: column;
	margin-bottom: .2rem;
	.img{
		width: 100%;
		margin-bottom: .05rem;
		position: relative;
		img{
			width: 100%;
			border-radius: 5px;
		}
		span{
			position: absolute;
			left: .1rem;
			bottom: .1rem;
			font-size: .2rem;
			color: #fff;
		}
	}
	span{
		font-size: .22rem;
	}
}
</style>
<script>
import loading from '@/components/loading.vue'
export default{
	name:'rankingList',
	data (){
		return{
			topList:[],
			rankList:[]
		}
	},
	methods:{
		back(){
			this.$router.go(-1)
		},
		getRankingList (){
			this.axios.get('/toplist/detail').then(res=>{
		      	console.log(res.data.list)
		      	let list=res.data.list;
		      	list.forEach((item,index)=>{
		      		if (item.tracks.length!=0) {
		      			this.topList.push(item)
		      		}else{
		      			this.rankList.push(item)
		      		}
		      	})

		    })
		},
		to (id){
			this.$router.push('/songlist?id='+id)
		}

	},
	components:{
		loading
	},
	computed:{
		
	},
	mounted (){
		this.getRankingList()
	},
	beforeRouteLeave (to,from,next){
    
    // if (to.name=='playpage'||to.name=='songlist') {
      this.scrollTop=this.$refs.scrollview.scrollTop;
    //   this.$route.meta.keepAlive=true;
      
    // }else{
    //   this.$route.meta.keepAlive=false;
    // }
    if (to.name != "playpage"&&to.name!='songlist') {

	      this.$store.commit("noKeepAlive", "rankingList");
	    }
    next()
  },
  beforeRouteEnter(to,from,next){

    next(vm=>{
     
      vm.$refs.scrollview.scrollTop=vm.scrollTop
  
    })
  },
  activated(){
  	console.log(this.scrollTop)
  	this.$nextTick(()=>{
  		this.$refs.scrollview.scrollTop=this.scrollTop
  	})
  	
  }
}

</script>
