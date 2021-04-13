import {get, post} from '@/plugins/utils/request.js'

export let licenseList = param => post('transForm/licenseList', param);  //分页查询已生成证照列表

export let licenseTypes = param => get('transForm/typeList');//查询证照分类列表

export let licenseInfo = param => get('transForm/licenseInfo/' + param);//查询证照信息

