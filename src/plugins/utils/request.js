import axios from 'axios'
import { message } from 'ant-design-vue';
import NProgress from 'nprogress'

var instance = axios.create({
    // baseURL:'http://192.168.2.43:10002/systemend/',
    baseURL:'http://10.2.2.50:9007/datamiddleend/',
    timeout:5000
});


// 请求拦截器
instance.interceptors.request.use(function(config){
    config.headers.Authorization = window.sessionStorage.getItem('token')
    NProgress.start()
    //请求发起之前
    return config;
},function(error){
    // 对请求错误做些什么
    message.error('请求超时!')
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(function(data){
    NProgress.done()
    return data;
},function(err){
    if(err==='Error: timeout of 5000ms exceeded'){
        message.error('请求超时!');
    }else if(err == 'Error: Network Error'){
        message.error('服务器被吃了⊙﹏⊙∥');
    }
    return Promise.reject(err);
});

export let get = async (url,param) => {
        let {data} = await instance.get(url,{
            param
        }).catch(e=>{
            message.error('系统异常!')
        })
        return data
}

export let post = async (url,param) => {
    let {data} = await instance.post(url,param).catch(e=>{
        message.error('系统异常!')
    })
    return data
}





export default instance
