module.exports = {
  // 保存时是否使用eslint检测代码
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT || 8666,
    proxy: {  //配置跨域
      '/api': {
        target: 'http://10.2.2.50:9007',  //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true,  //允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          '^/api': ''
        }
      },
    }
  }

  /*
    webpack配置 :
    // 链式操作webpack
    chainWebpack: config => {
      config
        .pugin('html')
        .tap(args => {
          // args[0].template = '/Users/username/proj/app/templates/index.html'
          // args[0].title = 'xxx名称'
          return args
        })
      // 别名
      config.resolue.alias
        .set('@',resolve('./src'))
        .set('~c',__dirname+resolve('/src/components'))
    }
  */
}
