import axios from 'axios';
import Vue from 'vue'
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';
let baseURL=process.env.NODE_ENV=='development'?'/api':'http://140.143.128.100:3000'

const service = axios.create({
  timeout: 7000, // 请求超时时间
  baseURL: baseURL,
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

service.interceptors.request.use(config=>{
	// vm.$dialog.loading.open('加载中');
	vm.$store.commit('isLoading',true)
	let token = window.localStorage.getItem("accessToken")
    if (token) {
        //将token放到请求头发送给服务器,将tokenkey放在请求头中
        config.headers.accessToken = token;     
        //也可以这种写法
        // config.headers['accessToken'] = Token;
    }
	return config
}, err => {
  return Promise.reject(err);
});

service.interceptors.response.use(config=>{
	// vm.$dialog.loading.close();
	vm.$store.commit('isLoading',false)
	return config
}, err => {
  return Promise.reject(err);
});

export default service
