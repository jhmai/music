module.exports = {
  publicPath: './',
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
 
},
  devServer: {
    host: '0.0.0.0',
    port:'8080',
    disableHostCheck: true,
    https:false,
    hotOnly: false,
    //代理
    proxy: {
      '/api': {
        target:'http://localhost:3000',
        changeOrigin: true,
        ws:true,
        //重写路径  需要设置重写的话，要在后面的调用接口前加上/api 来代替target
        pathRewrite:{
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/_variable.scss";
        `
      }
    }
  }

}
