<template>   
    <div class="login">
       <div class="logo">
        <img src="@/assets/images/logo.png" alt="">
      </div>
      <div class="loginList">
        <div class="phone" @click='phone'>手机号登录</div>
        <div class="try" @click='login'>立即体验</div>
      </div>
      
    <phone-login v-if="type==1" @back='show'></phone-login>
    </div>
</template>

<style scoped>
.login{
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #d43636;
}
.logo{
  width: 1rem;
  height: 1rem;
  border-radius: 50px;
  overflow: hidden; 
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo img{
  width: 1.2rem;
  height: 1.2rem;
}
.loginList{
  position: fixed;
  bottom: .85rem;
}
.loginList div{
  padding: .2rem 1.2rem;
  border-radius: 50px;
  font-size: .29rem;
}
.phone{
  background-color: #fff;
  color: #d43636;
}
.try{
  margin-top: .5rem;
  border: 1px solid #da8a8a;
  color: #fff;
}
</style>

<script>
import phoneLogin from './components/phoneLogin'
export default {
  name: 'login',
  data(){
    return{
      type:0
    }
  },
  components: {
    phoneLogin
  },
  methods:{
    phone () {
      this.type=1;
    },
    show(type) {
      this.type=0;
    },
    login() {
      this.$router.push('/home')
    }
  },
  props:{
    
  },
  computed:{
    
  },
  updated(){
    
  },
  watch:{
    
  }

}
</script>
