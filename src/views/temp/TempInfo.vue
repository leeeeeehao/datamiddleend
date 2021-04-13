<template>
  <div style="background-color: #ececec; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="10">
        <a-card title="模板缩略图" :bordered="true">
          <a-card-grid style="width:100%;text-align:center">
            <img src="../../assets/sfz.jpg"/>
            <a-card-meta title="身份证" style="margin-top: 10px">
            </a-card-meta>
          </a-card-grid>

        </a-card>
      </a-col>
      <a-col :span="14">
        <a-card title="模板扩展数据信息" :bordered="true">
          <a-table ref="table" rowKey="id" :pagination="false" :columns="columns" :data-source="kzList" :alert="true"
                   showPagination="auto">
          </a-table>
          <div class="divPagin" style="margin-top: 10px">
            <a-pagination v-model:current="pageIndex" :page-size-options="pageSizeOptions" :total="count" show-size-changer
                          :page-size="pageSize" @showSizeChange="onShowSizeChange" @change="getList">
              <template #buildOptionText="props">
                <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                <span v-else>全部</span>
              </template>
            </a-pagination>
          </div>
        </a-card>

      </a-col>

    </a-row>
  </div>
</template>
<script>
const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: {customRender: 'id'},
    width: 100
  },
  {
    title: '扩展字段',
    dataIndex: 'kzKey',
    key: 'kzKey',
  },
  {
    title: '扩展字段名称',
    dataIndex: 'kzName',
    key: 'kzName',
  },
  {
    title: '字段类型',
    dataIndex: 'type',
    key: 'type',
    ellipsis: true,
  },
  {
    title: '字段长度',
    dataIndex: 'length',
    key: 'length',
    ellipsis: true,
  }
];
export default {
  data() {
    return {
      pageIndex: 1,//页码
      pageSize: 10,//页面条数
      pageSizeOptions: ['1', '3', '9'],//页面条数选项
      count: 0,//结果最大数量
      columns,
      kzList: [
        {id: 1, kzKey: "KZ_XM", kzName: "姓名", type: "varchar",length:12},
        {id: 2, kzKey: "KZ_MZ", kzName: "民族", type: "varchar",length:12},
        {id: 2, kzKey: "KZ_XB", kzName: "性别", type: "varchar",length:12},
        {id: 2, kzKey: "KZ_CSRQ", kzName: "出生日期", type: "varchar",length:12},
        {id: 2, kzKey: "KZ_ZZ", kzName: "住址", type: "varchar",length:12},
      ]
    };
  },
  methods:{
    onShowSizeChange(pageIndex, pageSize) {
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.getList()
    },
  }
}
</script>
