import {get, post} from "@/plugins/utils/request";

/* 数据源*/
export let getTypes = param => get('dataSource/types');  //获取支持数据库类型

export let getDatabaseList = param => post('/datamiddleend/dataSource/findList', param);  //获取数据源列表



