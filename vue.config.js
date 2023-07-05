const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 设置代理
    proxy: {
      '/api': {
        target: 'http://172.20.10.4:8080', // 要跳转的位置
        chang: true, // 开启跨域
        pathRewrite: { // 重写，如果有 api 就将api重写为空
          '^/api': ''
        }
      }
    }
  }
})
