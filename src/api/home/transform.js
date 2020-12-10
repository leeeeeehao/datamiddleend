import {get} from "@/plugins/utils/request";
import {post} from "../../plugins/utils/request";

/* 转换 */
export let getTransformList = (param1, param2) => get('/datamiddleend/trans/findList/' + param1 + '/' + param2);  //获取转换列表

export let createTransform = param => post('/datamiddleend/trans/save', param);  //创建转换

export let delTransform = param => post('/datamiddleend/trans/del', param);  //删除转换


