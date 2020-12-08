<template>
	<div id="app">
		<a-row>
			<a-col :span="12">
			  <a-button type="primary" size="large" icon="plus" @click="showVisible">新增集群</a-button>
			</a-col>
			<a-col :span="12">
			  <a-input-search v-model:value="value" placeholder="请输入集群名称" enter-button="搜索" size="large"
				@change="getClusterPage" />
			</a-col>
		  </a-row>
		
		  <br />
		  <a-table class="table" rowKey="sciId" :pagination="false" :columns="columns" :data-source="data">
			<span slot="action" slot-scope="{ sciId }">
			  <a @click="del(sciId)">删除</a>
			  <a-divider type="vertical" />
			  <a @click="showInfoModel(sciId)">详情</a>
			  <a-divider type="vertical" />
			  <a @click="updateCluster(sciId)">配置</a>
			</span>
		  </a-table>

		  <div class="divPagin">
			<a-pagination v-model:current="current" :page-size-options="pageSizeOptions" :total="count" show-size-changer
			  :page-size="pageSize" @showSizeChange="onShowSizeChange" @change="getClusterPage">
			  <template #buildOptionText="props">
				<span v-if="props.value !== '50'">{{ props.value }}条/页</span>
				<span v-else>全部</span>
			  </template>
			</a-pagination>
		  </div>


		<a-modal v-model:visible="visible" ok-text="确认" cancel-text="取消" title="新增集群" width="800px" @ok="addCluster">
			<a-form-model ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol">
				<a-form-model-item label="服务名">
					<a-select default-value="请选择服务名" style="width: 200px" @change="serNameChange">
						<a-select-option v-for="item in serNameList" :key="item.serviceNameId" :value="item.serviceNameId">
							{{item.serviceName}}
						</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item label="版本号" >
					<a-select default-value="请选择版本号" style="width: 200px" @change="serVersionChange">
						<a-select-option v-for="item in serVersionList" :key="item.serviceVersionId" :value="item.serviceVersionId">
							{{item.serviceVersionNumber}}
						</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item label="集群模式" >
					<a-select default-value="请选择集群模式" style="width: 200px" @change="serScpChange">
						<a-select-option v-for="item in clusterSelectList" :key="item.scpId" :value="item.scpId">
							{{item.scpName}}
						</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item label="集群名称" >
					<a-input type="text" v-model="submitList.sciName"/>
				</a-form-model-item>
				<a-form-model-item label="集群描述" >
					<a-textarea
					v-model="submitList.describe"
					placeholder="请输入集群名称"
					:auto-size="{ minRows: 2, maxRows: 6 }"
					/>
				</a-form-model-item>
				

			</a-form-model>
		</a-modal>
	
		<a-modal v-model:visible="infoVisible" ok-text="确认" cancel-text="取消" title="集群详情" width="800px" @ok="updateCluster">
			<ul>
				<li>创建人:{{infoModelList.createUser}}</li>
				<li>创建时间:{{infoModelList.createTime}}</li>
				<li>描述:{{infoModelList.describe}}</li>
				<li>集群名称:{{infoModelList.sciName}}</li>
				<li>集群模式:{{infoModelList.scpName}}</li>
				<li>集群版本:{{infoModelList.serviceVersionNumber}}</li>
				<li>模式名称:{{infoModelList.snName}}</li>
				<li>serviceInfos</li>
			</ul>
		</a-modal>

		<a-modal v-model:visible="updateVisible" ok-text="确认" cancel-text="取消" title="配置集群" width="800px" @ok="updateCluster">
			<ul>
				<li>创建人:{{updModelList.createUser}}</li>
				<li>创建时间:{{updModelList.createTime}}</li>
				<li>描述:{{updModelList.describe}}</li>
				<li>集群名称:{{updModelList.sciName}}</li>
				<li>集群模式:{{updModelList.scpName}}</li>
				<li>集群版本:{{updModelList.serviceVersionNumber}}</li>
				<li>模式名称:{{updModelList.snName}}</li>
			</ul>
			<div>
				<h1>可绑定服务</h1>
				<a-table class="table" rowKey="serviceId" :pagination="false" :columns="columnsPz" :data-source="dataPz">
					<span slot="action" slot-scope="{ serviceId }">
						<a @click="bd(serviceId)">绑定</a>
					</span>
				</a-table>
			</div>
			<div>
				<h1>已绑定服务</h1>
				<a-table class="table" rowKey="scrrId" :pagination="false" :columns="columnsBD" :data-source="dataBD">
					<span slot="action" slot-scope="{ scrrId }">
						<a @click="jb(scrrId)">解绑</a>
					</span>
				</a-table>
			</div>
		</a-modal>

		<a-modal v-model:visible="updateSubVisible" ok-text="确认" cancel-text="取消" title="配置角色" width="800px" @ok="bdOk">
			<a-select v-model="bdSubmitList.bdRoleList.scrId" style="width: 120px" @change="bdChange">
                <a-select-option v-for="pro in bdSubmitList.bdRoleList" :key="pro.scrId" :value="pro.scrId">
                  {{ pro.scrName }}
                </a-select-option>
              </a-select>
		</a-modal>
	</div>
</template>

<script>
 import {
	selectClusterPage,
	selClusterList,
	serName,
	selClusterVersionList,
	insertCluster,
	delCluster,
	cluList,
	bdClu,
	jbClu,
	bdRole
  } from '@/api/home/systemVersion.js'
  import {
    getProfile
  } from '@/api/user/user.js'

  const columnsPz =[{
	title: '编号',
    dataIndex: 'serviceId',
    key: 'serviceId',
  },
  {
	title: '端口',
    dataIndex: 'servicePort',
    key: 'servicePort',
  },
  {
	title: '服务名称',
    dataIndex: 'serviceName',
    key: 'serviceName',
  },
  {
	title: '服务类型',
    dataIndex: 'serviceTypeName',
    key: 'serviceTypeName',
  },
  {
	title: '版本',
    dataIndex: 'serviceVersionNumber',
    key: 'serviceVersionNumber',
  },
  {
	title: 'IP',
    dataIndex: 'serviceAddress',
    key: 'serviceAddress',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {
      customRender: 'action'
    },
  },
]

  const columns = [{
    title: '编号',
    dataIndex: 'sciId',
    key: 'sciId',
  },
  {
    title: '集群名称',
    dataIndex: 'sciName',
    key: 'sciName',
  },
  {
    title: '集群模式',
    key: 'scpName',
    dataIndex: 'scpName',
  },
  {
    title: '服务名称',
    key: 'snName',
    dataIndex: 'snName',
  },
  {
    title: '创建人',
    key: 'createUser',
    dataIndex: 'createUser',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
  {
    title: '包含服务(个数)',
    key: 'serviceCount',
    dataIndex: 'serviceCount',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {
      customRender: 'action'
    },
  },
  ];

  const columnsBD=[{
	title: '编号',
    dataIndex: 'scrrId',
    key: 'scrrId',
  },
  {
	title: '服务名称',
    dataIndex: 'serviceName',
    key: 'serviceName',
  },
  {
	title: '类型名称',
    dataIndex: 'serviceTypeName',
    key: 'serviceTypeName',
  },
  {
	title: '版本',
    dataIndex: 'serviceVersionNumber',
    key: 'serviceVersionNumber',
  },
  {
	title: '端口',
    dataIndex: 'servicePort',
    key: 'servicePort',
  },
  {
	title: 'IP',
    dataIndex: 'serviceAddress',
    key: 'serviceAddress',
  },
  {
	title: 'clusterRole',
    dataIndex: 'clusterRole',
    key: 'clusterRole',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {
      customRender: 'action'
    },
  },
]

	export default {
		data() {
			return {
				labelCol: { span: 5 },
				wrapperCol: { span: 14 },
				data: [],
				columns,
				current: 1,
				count: 0,
				pageSize: 10,
				pageSizeOptions: ['1', '3', '5', '10', '50'],
				value: '',
				accountList: [],
				visible: false,
				updateVisible:false,
				infoVisible:false,
				updateSubVisible:false,
				clusterFrom:[],
				clusterRules:[],
				clusterSelectList:[],
				serNameList:[],
				serVersionList:[],
				submitList:{
					snId:'',//所属服务名称ID
					svId:'',//版本号
					scpId:'',//所属模式ID
					sciName:'',//服务集群名称
					describe:'',//描述
				},
				infoModelList:{
					serviceInfos:[]
				},
				updModelList:{
					serviceInfos:[]
				},
				columnsPz,
				dataPz:[],
				columnsBD,
				dataBD:[],
				bdSubmitList:{
					sciId:'',
					serviceId:'',
					srId:'',
					bdRoleList:[],
				},
				sid:'',
				
			}
		},
		created() {
			this.getAccountInfo()
			this.getClusterPage()
		},
		methods:{
			async getClusterPage(){
				let res = await selectClusterPage({
					"pageIndex": this.current,
					"pageSize": this.pageSize,
					"sciName": this.value
				})
				console.log(res)
				if (res.status !== true) return this.$msge('获取服务器列表失败!')
				this.data = res.data.list
				this.count = res.data.totalCount
			},
			async getAccountInfo() {
				let res = await getProfile();
				if (res.status !== true) return this.$msge(res.msg)
				this.accountList = res.data
			},
			onShowSizeChange(current, pageSize) {
				this.pageSize = pageSize;
				this.getClusterPage()
			},
			async addCluster(){
				let res = await insertCluster({
					"snId":this.submitList.snId,//所属服务名称ID
					"svId":this.submitList.svId,//版本号
					"scpId":this.submitList.scpId,//所属模式ID
					"sciName":this.submitList.sciName,//服务集群名称
					"describe":this.submitList.describe,//描述
					"createUser":this.accountList.accountNickName
				})
				if(res.status !== true) return this.$msge('新增失败')
				this.visible= false
				this.getClusterPage()
				return this.$msgs('新增成功')

			},
			async updateCluster(val){
				this.sid = val
				//配置
				let res = await this.$vget('serviceClusterInfo/selectOne?id='+val)
				this.updModelList = res.data.data
				this.updateVisible = true
				
				//可绑定列表
				let pro = await cluList({
					"snId":res.data.data.snId,
					"svId":res.data.data.svId,
					"dbciId":0
				})
				this.dataPz = pro.data

				//已绑定列表
				this.dataBD = res.data.data.serviceInfos
				
				this.bdSubmitList.sciId = val
			},
			del(sciId){
				let let_t = this
				let_t.$mc('确定删除?',async()=>{
					let res= await delCluster({
						"id":sciId,
						"deleteUser":this.accountList.accountNickName
					})
					if(res.status !== true) return this.$msge('删除失败')
					this.getClusterPage()
					return this.$msgs('删除成功')
				})
			},
			showVisible(){
				this.visible= true
				this.getServerName()
			},
			async getServerName(){
				let res= await serName()
				if(res.status !== true) return thsi.$msge('获得服名称列表失败!')
				this.serNameList = res.data
			},
			async serNameChange(val){
				let res = await selClusterList({
					"snId":val
				});
				if(res.status !== true) return this.$msge('获取集群模式列表失败')
			this.submitList.snId = val 
				this.clusterSelectList = res.data
				let pro = await selClusterVersionList({
					"snId":val
				});
				if(pro.status !== true) return this.$msge('获取版本列表失败')
				this.serVersionList = pro.data
			},
			serVersionChange(val){
				this.submitList.svId = val
			},
			serScpChange(val){
				this.submitList.scpId = val
			},
			async showInfoModel(id){
				let res = await this.$vget('serviceClusterInfo/selectOne?id='+id)
				this.infoModelList = res.data.data
				this.infoVisible = true
			},
			async bd(id){
				this.bdSubmitList.serviceId = id
				let res = await bdRole(this.bdSubmitList.sciId)
				this.bdSubmitList.bdRoleList = res.data
				this.updateSubVisible = true
			},
			bdChange(val){
				this.bdSubmitList.srId = val
			},
			async bdOk(){
				let res = await bdClu({
					sciId:this.bdSubmitList.sciId,
					serviceId:this.bdSubmitList.serviceId,
					srId:this.bdSubmitList.srId,
					updateUser:this.accountList.accountNickName
				})
				console.log(res)
				if(res.status !== true) return this.$msge('绑定失败')
				this.updateSubVisible = false

				//刷新
				let resB = await this.$vget('serviceClusterInfo/selectOne?id='+this.bdSubmitList.sciId)
				//可绑定列表
				let pro = await cluList({
					"snId":resB.data.data.snId,
					"svId":resB.data.data.svId,
					"dbciId":0
				})
				this.dataPz = pro.data
				//已绑定列表
				this.dataBD = resB.data.data.serviceInfos

				return this.$msgs('绑定成功')
			},
			async jb(id){
				console.log(id)
				let res = await jbClu({
					'id':id,
					'updateUser':this.accountList.accountNickName
				})
				if(res.status !== true) return this.$msge('解绑失败')
				//刷新
				let resB = await this.$vget('serviceClusterInfo/selectOne?id='+this.sid)
				//可绑定列表
				let pro = await cluList({
					"snId":resB.data.data.snId,
					"svId":resB.data.data.svId,
					"dbciId":0
				})
				this.dataPz = pro.data
				//已绑定列表
				this.dataBD = resB.data.data.serviceInfos


				return this.$msgs('解绑成功')

			}

		}
	}
	
</script>

<style>
.table {
    min-height: 530px !important;
  }
</style>
