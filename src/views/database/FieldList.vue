<template>
  <div id="app">
    <a-table ref="table" rowKey="id" :pagination="false" :columns="columns" :data-source="fieldList"
             :alert="true"
             showPagination="auto">
      <span slot="action" slot-scope="{}">
			  <a @click="">查看字段</a>
			</span>
    </a-table>
  </div>
</template>

<script>

import {getFieldList} from "@/api/home/database";

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    width: 350
  },
  {
    title: '字段名',
    dataIndex: 'fieldName',
    key: 'fieldName'
  },
  {
    title: '字段类型',
    dataIndex: 'filedType',
    key: 'filedType'
  },
  {
    title: '字段长度',
    dataIndex: 'filedLength',
    key: 'filedLength'
  },
  {
    title: '字段注释',
    dataIndex: 'filedComment',
    key: 'filedComment'
  },
];


export default {
  name: "FieldList",
  data() {
    return {
      columns,
      fieldList: [],
    };
  },
  created() {
    this.getFieldList()
  },
  methods: {
    async getFieldList() {
      let r = await getFieldList({
        "databaseName": this.$route.params.databaseName,
        "includeElement": 0,
        "nodeId": "data",
        "tableName": this.$route.params.tableName
      });
      this.fieldList = r.data
    }
  }
}
</script>

<style scoped>

</style>
