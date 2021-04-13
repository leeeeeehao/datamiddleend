<template>
  <div id="app">
    <span>
      证照类型选择:
      <a-select style="width: 120px;margin-right: 20px" @change="handleChange">
      <a-select-option v-for="(type,typeIndex) in options" :key="type.typeId" :value="type.typeCode">
        {{ type.typeName }}
      </a-select-option>

    </a-select>
      日期选择:
      <a-range-picker style="margin-right: 20px" @change="onChange"/>
      <a-input-search placeholder="输入身份证号码" style="width: 200px"/>
      <a-button type="primary" style="margin-left: 20px" @click="getList">
      筛选查询
    </a-button>
    </span>


    <a-table ref="table" rowKey="id" :pagination="false" :columns="columns" :data-source="licenseList" :alert="true"
             bordered showPagination="auto" style="margin-top: 20px">
      <span slot="action" slot-scope="{ documentId,licenesTypeCode}">
			  <a @click="gotoLink(documentId)">查看</a>
			</span>
    </a-table>

    <div class="divPagin" style="margin-top: 30px">
      <a-pagination v-model:current="pageIndex" :page-size-options="pageSizeOptions" :total="count" show-size-changer
                    :page-size="pageSize" @showSizeChange="onShowSizeChange" @change="getList">
        <template #buildOptionText="props">
          <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
          <span v-else>全部</span>
        </template>
      </a-pagination>
    </div>
  </div>
</template>
<script>
import {licenseList, licenseTypes} from "@/api/home/licenseManagement";
import CreateForm from '@/components/modules/CreateForm'

const columns = [
  {
    title: '序号', dataIndex: 'documentId', key: 'documentId', customRender: (text, record, index) =>
      `${
        index + 1}`,
    width: 100
  },
  {title: '持证人身份证号码', dataIndex: 'certificateNumber', key: 'certificateNumber',},
  {title: '证照类型', dataIndex: 'typeName', key: 'typeName',},
  {title: '证照生成时间', dataIndex: 'createTime', key: 'createTime', ellipsis: true,},
  {title: '证照变更时间', dataIndex: 'updateTime', key: 'updateTime', ellipsis: true,},
  {title: '操作', align: "center", width: 100, scopedSlots: {customRender: 'action'},},
];

export default {
  components: {
    CreateForm
  },
  data() {
    return {
      pageIndex: 1,//页码
      pageSize: 10,//页面条数
      pageSizeOptions: ['1', '3', '9'],//页面条数选项
      count: 0,//结果最大数量
      mdl: null,
      visible: false,//是否显示表单
      confirmLoading: false,
      columns,
      licenseList: [],//证照列表
      options: [],//证照类型列表
      licenseTypeCode: 0,//证照类型代码
      date: [],//日期数组
    };
  }, created() {
    this.getList(),
      this.getTypes()
  }, methods: {
    async getList() {
      let r = await licenseList({
        "pageIndex": this.pageIndex,
        "pageSize": this.pageSize,
        "licenesType": this.licenseTypeCode,
        "startTime": this.date[0],
        "endTime": this.date[1]
      });
      this.licenseList = r.data.list
      this.count = r.data.total
      this.pageIndex = r.data.pageNum
      this.pageSize = r.data.pageSize
    },
    async getTypes() {
      console.log("获取证照类型列表")
      let r = await licenseTypes({});
      this.options = r.data
    },
    onShowSizeChange(pageIndex, pageSize) {
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.getList()
    },
    handleChange(value) {
      this.licenseTypeCode = value;
      console.log(this.licenseTypeCode);
    },
    onChange(date, dateString) {

      this.date = date
      console.log(this.date[0].toString());
    },
    gotoLink(infoId) {
      console.log("证照信息ID为:" + infoId);
      // this.$router.replace('/tableList')
      this.$router.push({
        name: 'licenseInfo',
        params: {
          infoId: infoId,
        }
      })
    }
  },
};
</script>
