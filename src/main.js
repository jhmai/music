import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import animated from 'animate.css' // npm install animate.css --save安装，再引入
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
import 'vue-ydui/dist/ydui.flexible.js';
import '@/assets/iconfont/iconfont.css';
import utils from '@/utils/utils.js'
// import Mint from 'mint-ui';
import service from '@/service/service.js'
// Vue.use(Mint);
Vue.use(YDUI);
Vue.use(animated)
Vue.config.productionTip = false;
Vue.prototype.utils=utils;

import {Layout} from 'vue-ydui/dist/lib.rem/layout';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import loading from '@/components/loading'
Vue.component('loading', loading)
// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
/* 使用px：import {Layout} from 'vue-ydui/dist/lib.px/layout'; */
Vue.component(Layout.name, Layout);

Vue.prototype.axios=service;

window.vm=new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
