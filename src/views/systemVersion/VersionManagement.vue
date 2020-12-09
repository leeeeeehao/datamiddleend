<template>
	<div id="app">
		<a-row>
			<a-col :span="3">
			  <a-button type="primary" size="large" icon="plus" @click="visible = true" >新增编目</a-button>
			</a-col>
			<a-col :span="12">
			  <!-- <a-input-search v-modules:value="value" placeholder="请输入服务类型" enter-button="搜索" size="large"
				 /> -->
				 <a-select
					show-search
					placeholder="请输入服务类型"
					option-filter-prop="children"
					style="width: 200px"
					:filter-option="filterOption"
					@change="handleChange"

				>
					<a-select-option v-for="o in cataList" :value="o.serviceTypeId" :key="o.serviceTypeId">
					{{o.serviceTypeName}}
					</a-select-option>
				</a-select>
			</a-col>
		  </a-row>

		  <br />
		  <a-table class="table" rowKey="catalogueId" :pagination="false" :columns="columns" :data-source="data">
			<span slot="action" slot-scope="{ catalogueId }">
			  <a @click="">删除</a>
			  <a-divider type="vertical" />
			  <a @click="">修改</a>
			</span>
		  </a-table>

		  <div class="divPagin">
			<a-pagination v-model:current="current" :page-size-options="pageSizeOptions" :total="count" show-size-changer
			  :page-size="pageSize" @showSizeChange="onShowSizeChange" @change="getPage">
			  <template #buildOptionText="props">
				<span v-if="props.value !== '50'">{{ props.value }}条/页</span>
				<span v-else>全部</span>
			  </template>
			</a-pagination>
		  </div>


		<a-modal v-model:visible="visible" ok-text="确认" cancel-text="取消" title="新增编目" width="800px" @ok="">
			<a-form-model ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol">
				<a-form-model-item label="端口" prop="">
					<a-select></a-select>
				</a-form-model-item>
				<a-form-model-item label="端口" prop="">
					<a-select></a-select>
				</a-form-model-item>

			</a-form-model>


		</a-modal>

	</div>
</template>

<script>
import {
	sPage
  } from '@/api/home/Catalogue.js'
  import {
    serType
  } from '@/api/home/systemVersion.js'
  import {getProfile} from '@/api/user/user.js'

  const columns = [{
    title: '编号',
    dataIndex: 'catalogueId',
    key: 'catalogueId',
  },
  {
    title: '服务类型',
    key: 'serviceTypeName',
    dataIndex: 'serviceTypeName',
  },
  {
    title: '服务名称',
    key: 'serviceName',
    dataIndex: 'serviceName',
  },
  {
    title: '版本号',
    key: 'versionNumber',
    dataIndex: 'versionNumber',
  },
  {
    title: '开始时间',
    key: 'startTime',
    dataIndex: 'startTime',
  },
  {
    title: '结束时间',
    key: 'finishTime',
    dataIndex: 'finishTime',
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
				cataList:[],
				val:'',
				columns,
				current: 1,
				count: 0,
				pageSize: 10,
				pageSizeOptions: ['1', '3', '5', '10', '50'],
				value: '',
				accountList: [],
				visible:false,

			}
		},
		created() {
			this.getPage()
			this.gs()
			this.getAccountInfo()
		},
		methods:{
			async gs(){
				let r = await serType();
				this.cataList = r.data
			},
			async getAccountInfo() {
				let res = await getProfile();
				if (res.status !== true) return this.$msge(res.msg)
				this.accountList = res.data
			},
            async getPage(){
				console.log(this.val);
				let res = await sPage({
					"pageIndex": this.current,
					"pageSize": this.pageSize,
					"serviceTypeId":this.val
				})
				if (res.status !== true) return this.$msge('获取编目列表失败!')
				this.data = res.data.list
				this.count = res.data.totalCount
			},
			onShowSizeChange(current, pageSize) {
				this.pageSize = pageSize;
				this.getPage()
			},
			async add(){

			},

			handleChange(v) {
				this.val = v
				this.getPage()
			},
			filterOption(input, option) {
			return (
				option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
			);
			},



		}
	}

</script>

<style>
.table {
    min-height: 530px !important;
  }
</style>
