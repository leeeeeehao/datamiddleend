module.exports = {
  // 保存时是否使用eslint检测代码
  lintOnSave: false,
  devServer:{
    host:'0.0.0.0',
    port:process.env.PORT||8666
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