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
    jump:''
  },
  mutations: {
  	play (state,id) {
  		this.state.playId=id;
  	},
  	changeStatus (state,status) {
  		this.state.playStatus=status;
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
      this.state.isLoading=isLoading;
    },
    jump (state,jump) {
      this.state.jump=jump;
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
