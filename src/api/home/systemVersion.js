import {get, post} from '@/plugins/utils/request.js'


/* 服务器操作 */
export let selectPage = ServerInfoPage => post('serverInfo/selectPage', ServerInfoPage); // 服务器查询

export let delServer = ServerId => post('serverInfo/delete', ServerId); // 服务器删除

export let addServer = Server => post('serverInfo/insert', Server); // 服务器新增

export let getSer = () => post('serverInfo/selectList'); //获得所属服务器名称

export let updateGetOne = param => get('serverInfo/selectOne?id=' + param)

export let getOperating = opId => get('serverOperatingSystem/selectList?osParentId=' + opId); //获得所有操作系统0


/* 服务操作 */
export let servicePage = ServiceInfoPage => post('serviceInfo/selectPage', ServiceInfoPage); // 服务查询

export let serVersion = () => get('serviceVersion/selectList'); // 获得所有服务版本

export let serName = () => get('serviceNameTable/selectList');// 获得所有服务名

export let serType = () => get('serviceType/selectList');// 获得所有服务类型

export let insertService = serviceInfo => post('serviceInfo/insert', serviceInfo);//新增服務

export let delService = dService => post('serviceInfo/delete', dService);//刪除服務

export let serviceOneInfo = param => get('serviceInfo/selectOne?id=' + param)

export let updateService = param => post('serviceInfo/update', param)


/* 集群操作 */
export let selectClusterPage = ClusterInfoPage => post('serviceClusterInfo/selectPage', ClusterInfoPage); // 服务器查询

export let selClusterList = clusterList => post('serviceClusterPattern/selectList', clusterList); // 服务器查询

export let selClusterVersionList = clusterVerList => post('serviceVersion/selectList', clusterVerList); //根据id查询版本列表

export let insertCluster = insCluster => post('serviceClusterInfo/insert', insCluster) //插入集群

export let delCluster = delClu => post('serviceClusterInfo/delete', delClu) //删除集群

export let cluList = param => post('serviceInfo/selectList', param)

export let bdClu = param => post('serviceClusterRoleRelation/addClusterRelation', param)

export let jbClu = param => post('serviceClusterRoleRelation/delClusterRelation', param)

export let bdRole = param => get('serviceClusterRole/selectList?scpId=' + param);


