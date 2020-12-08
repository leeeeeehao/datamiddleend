import {get} from "@/plugins/utils/request";

/* 转换 */
export let getTransformList = (param1,param2) => get('/datamiddleend/trans/findList/'+param1+'/'+param2);  //获取数据源列表


