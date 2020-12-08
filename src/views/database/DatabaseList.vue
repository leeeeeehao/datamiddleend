<template>
  <div id="app">
    <a-table rowKey="id" :pagination="false" :columns="columns" :data-source="databaseList">
      <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table>

    <div class="divPagin">
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

import {getDatabaseList} from "@/api/home/database";

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: {customRender: 'id'},
    width: 100
  },
  {
    title: '数据源名称',
    dataIndex: 'databaseName',
    key: 'databaseName',
  },
  {
    title: '主机地址',
    dataIndex: 'hostName',
    key: 'hostName',
    ellipsis: true,
  },
  {
    title: '端口',
    dataIndex: 'port',
    key: 'port',
    ellipsis: true,
    width: 80
  },
  {
    title: '数据库类型',
    dataIndex: 'databaseType',
    key: 'databaseType',
    ellipsis: true,
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
];

export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      pageSizeOptions: ['1', '3', '5', '10', '50'],
      count: 0,
      columns,
      databaseList: [],
    };
  }, created() {
    this.getList()
  }, methods: {
    async getList() {
      let r = await getDatabaseList({
        "pageIndex": this.pageIndex,
        "pageSize": this.pageSize
      });
      this.databaseList = r.data.list
      this.count = r.data.total
    },
    onShowSizeChange(pageIndex, pageSize) {
      this.pageSize = pageSize;
      this.getList()
    }
  },
};
</script>
