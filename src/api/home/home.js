import {get,post} from '@/plugins/utils/request.js'

export let getMenuList = () => get('menu/getAllMenu');