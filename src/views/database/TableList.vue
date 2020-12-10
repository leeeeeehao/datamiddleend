<template>
  <div id="app">
    <a-table ref="table" rowKey="id" :pagination="false" :columns="columns" :data-source="databaseInfoList"
             :alert="true"
             showPagination="auto">
      <span slot="action" slot-scope="{id,text}">
			  <a @click="">查看字段</a>
			</span>
    </a-table>
  </div>
</template>

<script>
import {getDatabaseInfo} from "@/api/home/database";

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    width:350
  },
  {
    title: '数据库',
    dataIndex: 'nodeId',
    key:'nodeId'
  },
  {
    title: '表名',
    dataIndex: 'text',
    key: 'text'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
];

export default {
  name: "TableList",
  data() {
    return {
      databaseName: '',
      columns,
      databaseInfoList: [],
    };
  },
  created() {
    this.databaseName = this.$route.params.databaseName
    this.getInfoList()
  },
  methods: {
    async getInfoList() {
      let r = await getDatabaseInfo({
        "databaseName": this.databaseName,
        "includeElement": 0,
        "nodeId": "table"
      });
      this.databaseInfoList = r.data
    },
  }
}
</script>

<style scoped>

</style>
