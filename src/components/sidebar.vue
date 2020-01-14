<template>
  <div class="sidebar" v-if='isShow' @click.self="close()">
     <div class="sidebar-content" :class="isHidden==1?'close':'open'">
      <div class="scrollview">
        <div class="main">
           <loading></loading>
             <div class="login" v-if='!uid' @click='login'>
               <span>立即登陆</span>
             </div>
             <div class="info" v-if='uid'>
              <div class="bg" :style="{backgroundImage: 'url('+avatarUrl+')',backgroundSize:'contain'}"></div>
                <div class="img" @click='toUser'>
                  <img :src="avatarUrl" alt="" >
                </div>
                <div class="username">
                  <div class="left">
                    <span class="name">{{nickName}}</span>
                    <span class="level">Lv.{{level}}</span>
                  </div>
                  <div class="sign">签到</div>
                </div>
                
             </div>
             <div class="option">
                <div>
                  <i class="iconfont">&#xe649;</i>
                  <span>我的消息</span>
                </div>
                <div>
                  <i class="iconfont">&#xe61f;</i>
                  <span>我的好友</span>
                </div>
                <div>
                  <i class="iconfont">&#xe60a;</i>
                  <span>听歌识曲</span>
                </div>
                <div>
                  <i class="iconfont">&#xe653;</i>
                  <span>个性装扮</span>
                </div>
             </div>
          </div>
        
        
        <div class="fixed">
           <div class="model">
             <i class="iconfont">&#xe6cf;</i>
             <span>夜间模式</span>
           </div>
           <div class="model">
             <i class="iconfont">&#xe618;</i>
             <span>设置</span>
           </div>
           <div class="model">
             <i class="iconfont">&#xe681;</i>
             <span>退出</span>
           </div>
        </div>
      </div>

     </div>

  </div>
</template>


<style scoped lang='less'>
  .sidebar{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
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
    width: 80%;
  }
  .close{
    width: 0;
  }
  .scrollview{
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    .main{
      height: 100%;
    }
  }
  .login{
    width: 100%;
    margin-top: .5rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }
  .login span{
    padding: .02rem .4rem;
    line-height: .6rem;
    border: 1px solid #cccccc;
    border-radius: 50px;
    text-align: center;
    flex-shrink: 0;
  }
  .info{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding:.4rem .25rem .6rem;
    position: relative;
    overflow: hidden;
  }
  .img{
    z-index: 999
  }
  .img img{
    width: 1rem;
    height: 1rem;
    border-radius: 50px;
    z-index: 1111;
  }
  .username{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: .2rem;
    z-index: 11;
  }
  .username div{
    flex-shrink: 0
  }
  .sign{
    padding: .05rem .25rem;
    border-radius: 50px;
    background-color: #ff1d11;
    color: #fff;
  }
  .name{
    font-size: .28rem;
  }
  .level{
    display: inline-block;
    font-size: .23rem;
    margin-left: .2rem;
    border-radius: 50px;
    padding: .05rem .1rem;
    background-color: #eee;
  }
  .bg{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    filter: blur(100px);
  }
  .option{
    width: 90%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    padding: .3rem 0;
    margin: 0 auto;
    div{
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: .23rem;
      flex-shrink: 0;
      i{
      font-size: .55rem;
      color:#ff1d11;
      }
    }
  }

  .fixed{
    width: 100%;
    height: .8rem;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    overflow-x: hidden;
    div{
      display: flex;
      align-items: center;
      flex-shrink: 0;
      overflow-x: hidden;
      span{
        margin-left: .1rem
      }
    }
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
      isHidden:1,
      avatarUrl:'',
      nickName:'',
      level:''
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
    },

    login () {
      this.$router.push('/login')
    },
    toUser () {
      
      this.$router.push('/userInfo')
    }
  },
  computed:{
    uid () {
      return this.$store.state.uid
    }
  },
  watch:{
    uid () {
      if (this.uid) {
        this.axios.get('/user/detail?uid='+this.uid).then(res=>{
          console.log(res.data)
          this.avatarUrl=res.data.profile.avatarUrl
          this.level=res.data.level
          this.nickName=res.data.profile.nickname
        })
      }
    }
  },
  mounted (){
    if (this.uid) {
        this.axios.get('/user/detail?uid='+this.uid).then(res=>{
          console.log(res.data)
          this.avatarUrl=res.data.profile.avatarUrl
          this.level=res.data.level
          this.nickName=res.data.profile.nickname
        })
      }
  }
  
}
</script>
