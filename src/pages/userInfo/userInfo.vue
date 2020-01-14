<template>
 	<div class="userInfo" ref="userInfo">
 		<div class="header">
 			<i class="iconfont" @click='back'>&#xe65e;</i>
 			<i class="iconfont">&#xe65c;</i>
 		</div>
 		<div class="main" ref="main" @scroll="handleScroll" :class="[isScroll?'scroll':'hidden']">
 			<div class="info" :style="{backgroundImage:'url('+backgroundUrl+')'}">
 				<div :style="{opacity:opacity}">
	 				<div class="headimg">
	 					<img :src="avatarUrl" alt="">
	 				</div>
	 				<span class="nickname">{{nickname}}</span>
	 				<div class="forward">
	 					<span>关注 {{follows}}</span>
	 					<span>粉丝 {{followeds}}</span>
	 				</div>
	 				<div class="button">
	 					<span>Lv.{{level}}</span>
	 					<div class="option">
	 						<span>编辑</span>
	 						<span>更换背景</span>
	 					</div>
	 				</div>
	 			</div>
 			</div>
 			<div class="scrollview" ref="scrollview" :class="[isScroll?'hidden':'scroll flex']">
 				<div class="title">
 					<span class='select'>主页</span>
 					<span>动态</span>
 				</div>
 				<div class="view" ref="view" @scroll="handleScrollview">
 					<div class="playlist">
 						<div class="creat">
 							<div class="list-title">
 								<span>创建的歌单</span>
 								<span class="total">({{creat.length}}个)</span>
 							</div>
	 						<div class="playMenu" v-for="item in creat">
	 							<img :src="item.coverImgUrl" alt="">
	 							<div class="right">
	 								<span class="name">{{item.name}}</span>
	 								<span class="num">{{item.trackCount}}首,播放{{item.playCount}}次</span>
	 							</div>
	 						</div>
 						</div>
 						<div class="collect">
 							<div class="list-title">
 								<span>收藏的歌单</span>
 								<span class="total">({{creat.length}})</span>
 							</div>
	 						<div class="playMenu" v-for="item in collect">
	 							<img :src="item.coverImgUrl" alt="">
	 							<div class="right">
	 								<span class="name">{{item.name}}</span>
	 								<span class="num">{{item.trackCount}}首,播放{{item.playCount}}次</span>
	 							</div>
	 						</div>
 						</div>
 						<div class="baseinfo">
 							<div>
 								<span class="base-title">基本信息</span>
 							</div>
 							<span>村龄：{{createDays}}天</span>
 							<span>地区：{{place}}</span>
 						</div>
 					</div>
 				</div>
 			</div>
 		</div>
 	</div>
</template>

<style scoped>
.userInfo{
	width: 100%;
	height: 100%;
	flex-direction: column;
	position: relative;
	overflow-y: hidden;
}
.header{
	display: flex;
	width: 100%;
	height: 40px;
	align-items: center;
	justify-content: space-between;
	padding:0 .2rem;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 9;
}
.header i{
	font-size: .35rem;
	color: #fff;
}
.main{
	position: relative;
	width: 100%;
	height: 100vh;
	overflow-y: scroll;
}
.info{
	height: 40%;
	width: 100%;
	background-size: cover;
	background-repeat: no-repeat;
}
.info>div{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: .2rem;
}
.headimg{
	width: 1.2rem;
	height: 1.2rem;
	margin-top: 1.2rem;
}
.headimg img{
	width: 100%;
	border-radius: 50px;
}
.nickname{
	font-size: .3rem;
	color: #fff;
	margin-top: .2rem;
}
.forward{
	font-size: .25rem;
	color: #dcdbdb;
	margin-top: .2rem;
}
.forward span{
	padding-right: .3rem;
	position: relative;
}
.forward span:first-child::after{
	content: '';
	position: absolute;
	right: .15rem;
	top: 0;
	height: 100%;
	width: 1px;
	background-color: #dcdbdb;
}
.button{
	display: flex;
	justify-content: space-between;
	color: #fff;
	margin-top: .2rem;
}
.button span{
	padding: .05rem .15rem;
	border-radius: 50px;
	background-color: #7b7979;
	margin-right: .2rem;
}
.scrollview{
	width: 100%;
	max-height: 100%;
	min-height: 50%;
	position: relative;
	top: -35px;
	background-color: #fff;
	border-radius: 15px 15px 0 0;
	overflow-y: hidden;
	z-index: 999
}
.scroll{
	overflow-y: scroll!important;
}
.hidden{
	overflow-y: hidden!important;
}
.title{
	display: flex;
	height: .6rem;
	min-height: .6rem;
	align-items: center;
	justify-content: space-around;
	font-size: .3rem;
	border-bottom: 1px solid #eee;
}
.title span{
	display: flex;
	height: 100%;
	align-items: center;
}
.select{
	color: #e96900;
	position: relative;
}
.select::after{
	content: '';
	position: absolute;
	width: 100%;
	height: 1px;
	background-color: #e96900;
	left: 0;
	bottom: 0;
}
.flex{
	display: flex;
	flex-direction: column;
}
.flex .view{
	overflow-y: scroll;
}
.playMenu{
	padding: .2rem;
}
.playMenu img{
	width: 1rem;
	border-radius: 5px;
}
.playMenu{
	display: flex;
}
.right{
	margin-left: .2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.name{
	font-size: .3rem;
	color: #000;
}
.num{
	font-size: .24rem;
	color: #ccc;
}
.list-title{
	font-size: .3rem;
	color: #000;
	padding-left: .2rem;
	font-weight: bold;
	margin: .1rem 0;
}
.total{
	font-size: .22rem;
	color: #ccc;
}
.baseinfo{
	display: flex;
	padding-left: .2rem;
	flex-direction: column;
	align-items: flex-start;
	margin-top: .3rem;
	font-size: .24rem;
	color: #bdbcbc;
}
.baseinfo span{
	margin-top: .15rem;
}
.base-title{
	font-size: .3rem;
	color: #000;
	font-weight: bold;
}
</style>

<script>
import areacode from "@/utils/area.js"
export default {
  name: 'userInfo',
  data(){
    return{
   		backgroundUrl:'',
   		avatarUrl:'',
   		level:'',
   		nickname:'',
   		follows:'',
   		followeds:'',
   		isScroll:true,
   		opacity:1,
   		playlist:[],
   		creat:[],
   		collect:[],
   		createDays:'',
   		areacode:areacode,
   		provinceCode:'',
   		cityCode:''
    }
  },
  components: {
    
  },
  methods:{
    
    handleScroll (e) {
      this.opacity=1-(this.$refs.main.scrollTop/this.$refs.scrollview.offsetTop)
      if (this.$refs.scrollview.offsetTop-this.$refs.main.scrollTop>55) {
      	this.isScroll=true
      	
      }else{
      	this.isScroll=false
      	this.opacity=0;
      }
    },
    handleScrollview(){
    	// console.log(this.$refs.scrollview.scrollTop)
    	if (this.$refs.view.scrollTop<=0) {
    		this.isScroll=true
    	}
    },
    back(){
    	this.$router.go(-1)
    }
    
  },
  mounted() {
  	if (this.uid) {
        this.axios.get('/user/detail?uid='+this.uid).then(res=>{
         
          this.backgroundUrl=res.data.profile.backgroundUrl
          this.avatarUrl=res.data.profile.avatarUrl
          this.level=res.data.level
          this.nickname=res.data.profile.nickname
          this.follows=res.data.profile.follows
          this.followeds=res.data.profile.followeds
          this.createDays=res.data.createDays
          this.provinceCode=res.data.profile.province
          this.cityCode=res.data.profile.city
        })

        this.axios.get('/user/playlist?uid='+this.uid).then(res=>{
        	var list=res.data.playlist.forEach(item=>{
        		item.playCount=this.utils.conversion(item.playCount)
        	})
        	this.playlist=res.data.playlist
        })
      }

      
  
  },
  updated(){
    // this.$nextTick(()=>{
    //   this.$refs.main.addEventListener('scroll', this.handleScroll);
    // })
  },
  activated () {

  },
  computed:{
   uid () {
      return this.$store.state.uid
    },
    place (){
    		let province='';
    		let city='';
    		let areacode=this.areacode;
    		for (let key in areacode){
    			if (key==this.provinceCode) {
    				province=areacode[key]
    			}else if(key==this.cityCode){
    				city=areacode[key]
    			}
    		}
    		return province+' '+city
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  watch:{
  	playlist (){
  		let list=this.playlist;
  		for (var i = 0; i < list.length; i++) {
  			if (list[i].name.indexOf(this.nickname) != -1) {
  				this.creat.push(list[i])
  			}else if(list[i].subscribed){
  				this.collect.push(list[i])
  			}
  		}
  	}
  },
  uid (){
  	
  }
  
}
</script>
