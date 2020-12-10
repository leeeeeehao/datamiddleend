import {get, post} from "@/plugins/utils/request";

/* 数据源*/
export let getTypes = param => get('dataSource/types');  //获取支持数据库类型

export let getDatabaseList = param => post('/datamiddleend/dataSource/findList', param);  //获取数据源列表

export let delDatabase = param => post('/datamiddleend/dataSource/del', param);  //删除数据源

export let createDatabase = param =>post('/datamiddleend/dataSource/add',param); //创建数据源

export let getDatabaseInfo = param =>post('/datamiddleend/dataSource/findInfo',param); //查询数据源信息


