const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8000,
    proxy: {
      '/api': {
        target: 'https://www.escook.cn',  		//要请求的域名
        pathRewrite:{'^/api':''},			//通过pathRewrite重写地址，将前缀/api转为/
        ws: false,							// 是否启用websockets
        changeOrigin: true					//开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      }
    }
  },
})

// devServer: {
//   proxy:'https://www.escook.cn'
// }


// proxy: {
//   '/api': {
//     target: 'https://www.escook.cn/', //接口域名
//     changeOrigin: true,             //是否跨域
//     ws: true,                       //是否代理 websockets
//     secure: true,                   //是否https接口
//     pathRewrite: {                  //路径重置
//       '^/api': ''
//     }
//   }
// }
