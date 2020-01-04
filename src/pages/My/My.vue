<template>
  <div class="My">
    <div class="content">
      <options :optionsList="optionsList"></options>

    </div>
    
  </div>
</template>

<style scoped>
  .My{
    font-size: .35rem;
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
  }
  .content{
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
</style>

<script>
import options from '@/components/options.vue'
export default {
  name: 'My',
  data(){
    return{
      bannerList:[],
      optionsList:[{
        icon:'&#xe603;',
        title:'每日推荐',
        link:''
      },
      {
        icon:'&#xe602;',
        title:'歌单',
        link:''
      },
      {
        icon:'&#xe604;',
        title:'排行榜',
        link:''
      },
      {
        icon:'&#xe601;',
        title:'电台',
        link:''
      },
      {
        icon:'&#xe634;',
        title:'私人FM',
        link:''
      },
      {
        icon:'&#xe634;',
        title:'私人FM',
        link:''
      },
      {
        icon:'&#xe634;',
        title:'私人FM',
        link:''
      },

      ]
    }
  },
  components: {
    options
  },
  methods:{

  },
  created() {

  }
}
</script>
