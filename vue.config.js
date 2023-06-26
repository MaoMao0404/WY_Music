const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 3001,
    client: {
      webSocketURL: 'ws://0.0.0.0:3001/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/api': {
        target: 'http://iwenwiki.com:3000',//目标地址 请求的后台接口 
        ws: true,
        changeOrigin: true,
        pathRewrite:{//路径重写
          "^/api":''
        }
      },
      //https://interface.music.163.com
      '/foo': {
        target: 'https://interface.music.163.com',//目标地址 请求的后台接口 
        ws: true,
        changeOrigin: true,
        pathRewrite:{//路径重写
          "^/foo":''
        }
      },
      '/boo': {
        target: 'https://music.163.com',//目标地址 请求的后台接口 
        ws: true,
        changeOrigin: true,
        pathRewrite:{//路径重写
          "^/boo":''
        }
      },

    }
  }
})
