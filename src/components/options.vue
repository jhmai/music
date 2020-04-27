<template>
  <div class="options stop-swiping" >
    <ul class="option-list">

      <router-link :to="item.link" tag="li" v-for="item in optionsList">
        <div>
          <i class="iconfont" v-html="item.icon"></i>
        </div>
        <span>{{item.title}}</span>
      </router-link>

    </ul>
  </div>
</template>

<style scoped>
.options{
  z-index: 9999;
  border-bottom: 1px solid #eeeeee;  
}
.option-list{
  display: flex;
  flex-wrap: nowrap;
  overflow: scroll;
  width: 100%;
  padding: .35rem 0;
  padding-left: .25rem;
  z-index: 999;
  justify-content: space-between;
}
.option-list>li{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: .3rem;
  flex-shrink: 0;
}
.option-list div{
  width: .9rem;
  height: .9rem;
  background: linear-gradient(90deg,#ff5a4c,#ff1d11);
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}
i{
  font-size: .8rem;
  color: #ffffff;
}
span{
  display: inline-block;
  font-size: .25rem;
  margin-top: .1rem;
}
</style>
<script>
export default {
  name: 'options',
  components: {

  },
  data(){
    return{
      
    }
  },
  props:{
    optionsList:{
      type:Array
    }
  },
  methods:{
    co() {
      console.log(111)
    }
  },
  computed: {

  },
  mounted() {
    
  }

  
}
</script>
