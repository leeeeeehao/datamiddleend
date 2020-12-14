import {get} from "@/plugins/utils/request";
import {post} from "../../plugins/utils/request";

/* 转换 */
export let getTransformList = (param1, param2) => get('/datamiddleend/trans/findList/' + param1 + '/' + param2);  //获取转换列表

export let createTransform = param => post('/datamiddleend/trans/save', param);  //创建转换

export let delTransform = param => post('/datamiddleend/trans/del', param);  //删除转换

export let editTransform = param => post('/datamiddleend/trans/edit', param);  //编辑转换

export let executeTransform = param => post('/datamiddleend/trans/execute', param);  //执行转换

export let previewLogsTransform = param1 => get('/datamiddleend/trans/previewLogs/' + param1); //查询执行转换结果




