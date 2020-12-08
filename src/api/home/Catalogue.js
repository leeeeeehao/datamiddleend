import {get,post} from '@/plugins/utils/request.js'

/*编目管理 */

export let sPage = param => post('catalogueInfo/selectPage',param); // 服务器查询