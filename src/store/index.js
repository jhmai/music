import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	playShow:false,//底部播放器
  	playId:'',
  	playStatus:1,//1播放 0暂停
  	playList:[],//播放列表
  	playmode:1,
  	totalTime:'',
  	currentTime:'',
    isLoading:true,
    jump:'',
    token:localStorage.getItem('token') ? localStorage.getItem('token'):'',   // token
    uid:localStorage.getItem('uid') ? localStorage.getItem('uid'):'',
  },
  mutations: {
  	play (state,id) {
  		state.playId=id;
  	},
  	changeStatus (state,status) {
  		state.playStatus=status;
  	},
  	changeSong (state,playList) {
  		state.playList=playList;
  	},
  	isplayShow (state,isshow) {
  		state.playShow=isshow;
  	},
  	totalTime (state,totalTime) {
      state.totalTime=totalTime
  	},
    currentTime (state,currentTime) {
      state.currentTime=currentTime
    },
    isLoading (state,isLoading) {
      state.isLoading=isLoading;
    },
    jump (state,jump) {
      state.jump=jump;
    },
    setToken(state,token){
      state.token=token;
      localStorage.setItem('token',token)
    },
    removeToken(){
      localStorage.removeItem('token')
    },
    setUid(state,uid){
      state.uid=uid;
      localStorage.setItem('uid',uid)
    },
    removeUid(){
      localStorage.removeItem('uid')
    }
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
