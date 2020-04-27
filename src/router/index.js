import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home/Home.vue'
import Find from '@/pages/Find/Find.vue'
import My from '@/pages/My/My.vue'
// import Songlist from '@/pages/Songlist/Songlist.vue'
// import Play from '@/pages/Play/Play.vue'
// import PlayPage from '@/pages/PlayPage/PlayPage.vue'
// import Login from '@/pages/login/login.vue'
// import UserInfo from '@/pages/userInfo/userInfo.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    components: {
      default:Home,
      // play:Play
    },
    meta:{
    	index:1,
      keepAlive:true
    },
    redirect: '/home',
    children:[
      {
          path:'/home',
          name:'home',
          components:{
            default:()=>import('@/pages/My/My.vue'),
            // find:Find
          },
          meta:{
            index:2,
            keepAlive:true,
          }
      },
      // {
      //   path:'find',
      //   name:'find',
      //   component:Find,
      //   meta:{
      //     index:2
      //   }
      // }
    ],

  },
  {
    path:'/songlist',
    component:()=>import('@/pages/Songlist/Songlist.vue'),
    name:'songlist',
    meta:{
      index:2,
      keepAlive:false
    }
  },
  {
    path:'/playpage',
    name:'playpage',
    component:()=>import('@/pages/PlayPage/PlayPage.vue'),
    meta:{
      index:2,
      keepAlive:false
    }
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('@/pages/login/login.vue'),
    meta:{
      index:2,
      keepAlive:false
    }
  },
  {
    path:'/userInfo',
    name:'userInfo',
    component:()=>import('@/pages/userInfo/userInfo.vue'),
    meta:{
      index:2,
      keepAlive:true
    }
  },
  {
    path:'/recommendList',
    name:'recommendList',
    component:()=>import('@/pages/recommendList/recommendList.vue'),
    meta:{
      index:2,
      keepAlive:false
    }
  }
  
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
 
  next()
})

export default router
