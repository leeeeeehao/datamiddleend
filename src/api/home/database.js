import {get} from "@/plugins/utils/request";

/* 数据源*/
export let getTypes = param => get('dataSource/types');  //获取支持数据库类型

export let getDatabaseList = param => get('/datamiddleend/dataSource/findList');  //获取数据源列表


