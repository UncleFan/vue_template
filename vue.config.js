const webpack = require('webpack')
 
module.exports = {
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }])
  },
  devServer: {
    proxy: {
        '/sys': {     //这里最好有一个 /
            target: 'https://api-analysis.guokai-dev.showcode.fun',  // 后台接口域名
            ws: true,        //如果要代理 websockets，配置这个参数
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite:{
                
            }
        }
    }
  }
}