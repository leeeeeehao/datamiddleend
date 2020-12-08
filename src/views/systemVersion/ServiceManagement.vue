<template>
	<div id="main">
		<a-row>
			<a-col :span="12">
				<a-button type="primary" size="large" icon="plus" @click="getSerList">新增服务</a-button>
			</a-col>
			<a-col :span="12">
				<a-input-search v-model:value="value" placeholder="请输入服务名称" enter-button="搜索" size="large"
				@change="getServicePage" />
			</a-col>
		</a-row>

		<br />
		<a-table class="table" rowKey="serviceId" :pagination="false" :columns="columns" :data-source="data">  
			<span slot="action" slot-scope="{ serviceId }">
			  <a @click="showUpdateModel(serviceId)">修改</a>
			  <a-divider type="vertical"/>
			  <a @click="del(serviceId)">删除</a>
			  <a-divider type="vertical"/>
			  <a @click="showServiceInfoModel(serviceId)">详情</a>
			</span>
		  </a-table>

		<div class="divPagin">
			<a-pagination v-model:current="current" :page-size-options="pageSizeOptions" :total="count" show-size-changer
			  :page-size="pageSize" @showSizeChange="onShowSizeChange" @change="getServicePage" >
			  <template #buildOptionText="props">
				<span v-if="props.value !== '50'">{{ props.value }}条/页</span>
				<span v-else>全部</span>
			  </template>
			</a-pagination>
		  </div>

		  <a-modal v-model:visible="visible" ok-text="确认" cancel-text="取消" title="新增服务" width="800px" @ok="addSerivce">
			<a-form-model ref="ruleForm" :rules="serviceRules" :label-col="labelCol" :wrapper-col="wrapperCol">
				<a-form-model-item label="服务名称" prop="serviceName">
					<a-select default-value="请选择所属服务器" style="width: 200px" @change="serNameSelectChange">
						<a-select-option v-for="item in serNameList" :key="item.serviceNameId" :value="item.serviceNameId">
							{{item.serviceName}}
						</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item label="服务类型" prop="serviceType">
					<a-select v-model:default-value="stIdName == '' ? '请选择服务类型' : stIdName" style="width: 200px" @change="serTypeChange">
						<a-select-option v-for="item in serTypeList" :key="item.serviceTypeId" :value="item.serviceTypeId">
							{{item.serviceTypeName}}
						</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item label="服务版本" prop="serviceVersion">
					<a-select default-value="请选择服务版本" style="width: 200px" @change="serVersionChange">
						<a-select-option v-for="item in serviceVersionList" :key="item.serviceVersionId" :value="item.serviceVersionId" >
							{{item.serviceVersionNumber}}
						</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item label="所属服务器" prop="serviceName">
					<a-select default-value="请选择服务名称"  style="width: 200px" @change="serverSelectChange">
						<a-select-option v-for="item in serverList" :key="item.serverId" :value="item.serverId">
						  {{item.serverName}}
						</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item label="IP地址" prop="serviceIp">
					<a-input type="text" v-model="submitList.ip"></a-input>
				</a-form-model-item>
				<a-form-model-item label="端口" prop="servicePost">
					<a-input type="text" v-model="submitList.post"/>
				</a-form-model-item>

			</a-form-model>
		  </a-modal>

		  <a-modal v-model:visible="updateVisible" ok-text="确认" cancel-text="取消" title="修改服务" width="800px" @ok="updateSerivce">
			<a-form-model ref="ruleForm" :rules="serviceRules" :label-col="labelCol" :wrapper-col="wrapperCol">
				<a-form-model-item label="服务名称" prop="serviceName">
					<a-select v-model="updServiceList.snId"  style="width: 200px" @change="serNameSelectChange">
						<a-select-option v-for="item in serNameList" :key="item.serviceNameId" :value="item.serviceNameId">
							{{item.serviceName}}
						</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item label="服务类型" prop="serviceType">
					<a-select v-model="updServiceList.stId" style="width: 200px" @change="serTypeChange">
						<a-select-option v-for="item in serTypeList" :key="item.serviceTypeId" :value="item.serviceTypeId">
							{{item.serviceTypeName}}
						</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item label="服务版本" prop="serviceVersion">
					<a-select v-model="updServiceList.svId" style="width: 200px" @change="serVersionChange">
						<a-select-option v-for="item in serviceVersionList" :key="item.serviceVersionId" :value="item.serviceVersionId" >
							{{item.serviceVersionNumber}}
						</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item label="所属服务器" prop="serviceName">
					<a-select v-model="updServiceList.serverInfo.serverId"  style="width: 200px" @change="serverSelectChange">
						<a-select-option v-for="item in serverList" :key="item.serverId" :value="item.serverId">
						  {{item.serverName}}
						</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item label="IP地址" prop="serviceIp">
					<a-input type="text" v-model="updServiceList.serviceAddress"></a-input>
				</a-form-model-item>
				<a-form-model-item label="端口" prop="servicePost">
					<a-input type="text" v-model="updServiceList.servicePort"/>
				</a-form-model-item>

			</a-form-model>
		  </a-modal>

		  <a-modal v-model:visible="infoVisible" ok-text="确认" cancel-text="取消" title="服务详情" width="800px" @ok="updateSerivce">
			  	<ul>
					  <li>编号:{{showServiceModelInfoList.serviceId}}</li>
					  <li>服务名称:{{showServiceModelInfoList.serviceName}}</li>
					  <li>服务类型:{{showServiceModelInfoList.serviceTypeName}}</li>
					  <li>版本:{{showServiceModelInfoList.serviceVersionNumber}}</li>
					  <li>端口:{{showServiceModelInfoList.servicePort}}</li>
					  <!-- <li>IP地址{{showServiceModelInfoList.serviceAddress}}</li> -->
					  <li>虚拟机名称:{{showServiceModelInfoList.serverInfo.osName}}</li>
					  <li>虚拟机版本:{{showServiceModelInfoList.serverInfo.osVersion}}</li>
					  <li>服务器:{{showServiceModelInfoList.serverInfo.serverName}}</li> 
				  </ul>
				<p></p>
				<p></p>
				<p></p>
		  </a-modal>

	</div>
</template>

<script>
import {
	servicePage,
	serVersion,
	getSer,
	serType,
	serName,
	insertService,
	delService,
	serviceOneInfo,
	updateService
  } from '@/api/home/systemVersion.js'
  import {getProfile} from '@/api/user/user.js'

const columns = [{
      title: '编号',
      dataIndex: 'serviceId',
      key: 'serviceId',
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
      key: 'serviceVersionNumber',
      dataIndex: 'serviceVersionNumber',
    },
    {
      title: '端口',
      key: 'servicePort',
      dataIndex: 'servicePort',
    },
    {
      title: 'IP地址',
      key: 'serviceAddress',
      dataIndex: 'serviceAddress',
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: {
        customRender: 'action'
      },
    },
  ];

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
				serviceRules:{},
				serviceVersionList:[],
				serverList:[],
				serTypeList:[],
				serNameList:[],
				stIdName:'',
				submitList:{
					serviceNameId:'',
					serviceTypeId:'',
					serviceVersionId:'',
					serverId:'',
					ip:'',
					post:''
				},
				showServiceModelInfoList:{
					serverInfo:[],
				},
				updServiceList:{
					serverInfo:[],
				},
					
			}
		},
		created() {
			this.getServicePage()
			this.getAccountInfo()
		},
		methods: {
			async getServicePage() {
				let res = await servicePage({
					"pageIndex": this.current,
					"pageSize": this.pageSize,
					"serviceName": this.value
				})
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
				this.getServicePage()
			},
			async addSerivce(){
				
				let res = await insertService({
					"snId":this.submitList.serviceNameId,
					"stId":this.submitList.serviceTypeId,
					"svId":this.submitList.serviceVersionId,
					"serverId":this.submitList.serverId,
					"serviceAddress":this.submitList.ip,
					"servicePort":this.submitList.post,
					"createUser":this.accountList.accountNickName
				})
				if(res.status !== true) return this.$msge(res.msg)
				this.visible = false
				this.getServicePage()
				return this.$msgs('新增成功')
			},
			async updateSerivce(){
				console.log(this.updServiceList);
				var param ={
					snId:this.updServiceList.snId,
					stId:this.updServiceList.stId,
					svId:this.updServiceList.svId,
					serverId:this.updServiceList.serverInfo.serverId,
					servicePort:this.updServiceList.servicePort,
					serviceAddress:this.updServiceList.serviceAddress,
					updateUser:this.accountList.accountNickName
				}
				// 修改服务信息
				let res = await updateService({
					serviceId:this.updServiceList.serviceId,
					snId:this.updServiceList.snId,
					stId:this.updServiceList.stId,
					svId:this.updServiceList.svId,
					serverId:this.updServiceList.serverInfo.serverId,
					servicePort:this.updServiceList.servicePort,
					serviceAddress:this.updServiceList.serviceAddress,
					updateUser:this.accountList.accountNickName

				})
				if(res.status !== true) return this.$msge('修改失败')
				this.updateVisible = false
				this.getServicePage()
				return this.$msgs('修改成功')
			},
			del(serviceId){
				let let_t = this
					let_t.$mc('是否刪除?',async () => {
						let res = await delService({
						"serverId":serviceId,
						"deleteUser":this.accountList.accountNickName
					})
					if(res.status !== true) return this.$msge('刪除失敗')
					this.getServicePage()
					return this.$msgs('刪除成功')
				})
				
			},
			async getSerName(){
				let res = await getSer()
				if(res.status !== true) return this.$msge('获得所属服务器列表失败!')
				this.serverList = res.data
			},
			async getSerType(){
				let res = await serType()
				if(res.status !== true) return thsi.$msge('获得服务类型列表失败!')
				this.serTypeList = res.data
			},
			async getServerName(){
				let res= await serName()
				if(res.status !== true) return this.$msge('获得服名称列表失败!')
				this.serNameList = res.data
			},
			getSerList(){
				this.getServerName()
				this.getSerName()
				this.getSerType()
				this.visible = true
			},
			async serverSelectChange(val){
				let res = await this.$vget('serverInfo/selectOne?id='+val);
				this.submitList.serverId = val 
				this.submitList.ip = res.data.data.serverIp
				this.updServiceList.serviceAddress = res.data.data.serverIp
			},
			serTypeChange(val){
				this.submitList.serviceTypeId = val
			},
			serVersionChange(val){
				this.submitList.serviceVersionId = val
			},
			async serNameSelectChange(val){
				console.log(val)
				let res = await this.$vpost('serviceVersion/selectList',{
					"snId":val
				})
				this.serviceVersionList=res.data.data
				
				let pro = await this.$vget('serviceNameTable/selectOne?id='+val)
				this.submitList.post = pro.data.data.defaultPort
				this.updServiceList.servicePort = pro.data.data.defaultPort
				var thisstId = pro.data.data.stId
				if(thisstId!== ''){
					let pre = await this.$vget('serviceType/selectOne?id='+thisstId)
					this.stIdName = pre.data.data.serviceTypeName
				}

				this.submitList.serviceNameId = val
				this.submitList.serviceTypeId = thisstId
				this.updServiceList.stId = thisstId
				

			},
			async getAllServiceVersion(){
				let res = await serVersion()
				if(res.status !== true) return this.$msge('获取版本列表失败')
				this.serviceVersionList = res.data
			},
			async showUpdateModel(serviceId){
				this.updateVisible = true

				let res = await serviceOneInfo(serviceId)
				this.updServiceList = res.data
				console.log(res.data)

				let prod= await serName()
				if(prod.status !== true) return this.$msge('获得服名称列表失败!')
				this.serNameList = prod.data

				let pro = await serType()
				if(pro.status !== true) return thsi.$msge('获得服务类型列表失败!')
				this.serTypeList = pro.data

				let rest = await this.$vpost('serviceVersion/selectList',{
					"svId":res.data.svId
				})
				this.serviceVersionList=rest.data.data

				let resd = await getSer()
				if(resd.status !== true) return thsi.$msge('获得所属服务器列表失败!')
				this.serverList = resd.data

				
			},
			async showServiceInfoModel(serviceId){
				let res = await serviceOneInfo(serviceId)
				if(res.status !== true) return this.$msge('获取服务详情列表失败!')
				this.showServiceModelInfoList = res.data
				this.infoVisible = true
			},

		}
	}

</script>

<style lang="scss" scoped>
.table{
  min-height: 530px !important;
}
</style>