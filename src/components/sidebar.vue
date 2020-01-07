<template>
  <div class="sidebar" v-if='isShow' @click.self="close()">
     <div class="sidebar-content" :class="isHidden==1?'close':'open'">
       <loading></loading>
       <div class="login" v-if='!uid' @click='login'>
         <span>立即登陆</span>
       </div>
       <div class="info" v-if='uid'>
        <div class="bg" :style="{backgroundImage: 'url('+avatarUrl+')',backgroundSize:'contain'}"></div>
          <div class="img">
            <img :src="avatarUrl" alt="">
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
         <ul>
           <li>
             <i class="iconfont"></i>
           </li>
         </ul>
       </div>
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
  .img img{
    width: 1rem;
    height: 1rem;
    border-radius: 50px;
    z-index: 11;
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
    }
  },
  computed:{
    uid () {
      return this.$store.state.uid
    }
  },
  watch:{
    uid () {
      
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
