import Vue from 'vue'
import axios from './utils/request.js'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd);
  
// 全局混入
Vue.mixin({
    data(){
      return{
        axios
      }
    },
    methods:{
      $msgs(msg){
        return this.$message.success(msg);
      },
      $msge(msg){
        return this.$message.error(msg);
      },
      $msgi(msg){
        return this.$message.info(msg);
      },
      $vget(url,param){
        return this.axios.get(url,param) 
      },
      $vpost(url,param){
        return this.axios.post(url,param)
      },
      $vput(url,param){
        return this.axios.put(url,param)
      },
      $vde(url,param){
        return this.axios.delete(url,param)
      },
      $mc(content,onOk){
        let let_t = this
        let_t.$confirm({
          title:"系统提示",
          content,
          okText:'确定',
          cancelText:'取消',
          onOk,
          onCancel(){
             let_t.$msgi('取消操作!')
          }
        })
      }
    }
  })


