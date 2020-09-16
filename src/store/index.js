import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	playShow:false,//底部播放器
  	playId:'',
  	playStatus:1,//1播放 0暂停
  	playList:[],//播放列表
  	playmode:1,//播放模式
  	totalTime:'',
  	currentTime:'',
    isLoading:true,
    jump:'',
    token:localStorage.getItem('token') ? localStorage.getItem('token'):'',   // token
    uid:localStorage.getItem('uid') ? localStorage.getItem('uid'):'',
    catchArr: []
  },
  mutations: {
    iskeepAlive(state, component) {
      !state.catchArr.includes(component) && state.catchArr.push(component);
    },
    // 对指定组件进行动态更改缓存（不缓存）--组件调用该方法时，从缓存数组中删除对应的组件元素
    noKeepAlive(state, component) {
      let index = state.catchArr.indexOf(component);
      index > -1 && state.catchArr.splice(index, 1);
    },
  	play (state,id) {//当前播放id
  		state.playId=id;
  	},
  	changeStatus (state,status) {
  		state.playStatus=status;
  	},
  	changeSong (state,playList) {
  		state.playList=playList;//变换播放歌单
  	},
  	isplayShow (state,isshow) {
  		state.playShow=isshow;//是否显示播放组件
  	},
  	totalTime (state,totalTime) {//当前播放歌曲总时间
      state.totalTime=totalTime
  	},
    currentTime (state,currentTime) {//当前播放歌曲时间
      state.currentTime=currentTime
    },
    isLoading (state,isLoading) {
      state.isLoading=isLoading;//是否显示loading组件
    },
    jump (state,jump) {
      state.jump=jump;
    },
    setToken(state,token){
      state.token=token;
      localStorage.setItem('token',token)
    },
    removeToken(state){
      state.token='';
      localStorage.removeItem('token')
    },
    setUid(state,uid){
      state.uid=uid;
      localStorage.setItem('uid',uid)
    },
    removeUid(state){
      state.uid='';
      localStorage.removeItem('uid')
    },
    addSong(state,song){
      if (state.playList.length==0) {
        state.playList.push(song)
      }else{
        let index=state.playList.findIndex((item,index)=>{
        return item.id==state.playId;
      })
        state.playList.splice(index+1,0,song)
      }
      state.playId=song.id;
    },
    removeSong(state,id){
      let index=state.playList.findIndex((item,index)=>{
        return item.id==id;
      })
      state.playList.splice(index,1)
    },
    
  },
  actions: {
    usecurrentTime (context,time) {
      setTimeout(function(){
        context.commit('currentTime',time)
      },1000)
      
    }


  },
  getters:{

  },
  modules: {
  }
})
