<template>   
    <div class="phoneLogin">
        <div class="top">
          <i class="iconfont" @click='back'>&#xe65e;</i>
          <span>手机号登录</span>
        </div>
        <div class="content" v-show="status==0">
          <span class="tips">未注册手机号登录后将自动创建账户</span>
          <div class="phone" :class="{fill:isFill}">
            <span>+86</span>
            <input type="text" placeholder="请输入手机号" v-model="number">
          </div>
          <div class="next" @click="next">下一步</div>
        </div>
        <div class="passContent" v-if="status==1">
          <div class="password">
            <input type="password" placeholder="请输入密码" v-model="password">
            <span>忘记密码?</span>
          </div>
          <div class="login" @click='login'>登录</div>
        </div>
    </div>
</template>

<style scoped>
.phoneLogin{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
}
.top{
  height: .8rem;
  display: flex;
  justify-content: flex-start;
  font-size: .35rem;
  align-items: center;
  color: #383131;
  font-weight: bold;
}
.top i{
  font-size: .35rem;
  color: #383131;
  margin-left: .3rem;
  margin-right: .3rem;
  font-weight: bold;
}
.content{
  padding:.5rem .25rem;
}
.tips{
  font-size: .23rem;
  color: #969696;
}
.phone{
  color: #ccc;
  border-bottom: 1px solid #ccc;
  margin-top: 1rem;
  padding-bottom: .2rem;
  font-size: .28rem;
}
.phone span{
  margin-right: .25rem;
}
.phone input{
  border: none;
}
input::-webkit-input-placeholder {
 color: #ccc; 
}
.next{
  width: 100%;
  text-align: center;
  line-height: .8rem;
  border-radius: 50px;
  color: #fff;
  font-size: .3rem;
  margin-top: .9rem;
  background-color: #f74f4f;
}
.fill{
  color: #000!important;
}
.passContent{
  padding: 0 .2rem;
  width: 100%;
}
.password{
  color: #ccc;
  border-bottom: 1px solid #ccc;
  margin-top: 1rem;
  padding-bottom: .2rem;
  font-size: .28rem;
  display: flex;
  justify-content: space-between;
}
.password>span{
  margin-right: .25rem;
  color: #33599c;
  font-size: .2rem;
}
.password input{
  border: none;
}
.login{
  width: 100%;
  text-align: center;
  line-height: .8rem;
  border-radius: 50px;
  color: #fff;
  font-size: .3rem;
  margin-top: .9rem;
  background-color: #f74f4f;
}
</style>

<script>
export default {
  name: 'phoneLogin',
  data(){
    return{
      number:'',
      isFill:false,
      status:'0',
      password:''
    }
  },
  components: {
    
  },
  methods:{
    next () {
      console.log()
      this.status=1;
    },
    back (){
      if (this.status==0) {
        this.$emit('back',0)
      }else if(this.status==1){
        this.status=0
      }
    },
    login () {
      this.axios.get('login/cellphone?phone='+this.number+'&password='+this.password).then(res=>{
        if (res.status==200) {
          this.$store.commit('setToken',res.data.token)
          this.$store.commit('setUid',res.data.account.id)
          this.$router.push('/home');
        }
      })
    }
  },
  props:{
    
  },
  computed:{
    
  },
  updated(){
    
  },
  watch:{
    number () {
      if (this.number) {
        this.isFill=true
      }else{
        this.isFill=false
      }
    }
  }

}
</script>
