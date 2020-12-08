<template>
  <a-table :columns="columns" :data-source="databaseList">
    <a slot="name" slot-scope="text">{{ text }}</a>
  </a-table>
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
    title: '数据源名称',
    dataIndex: 'databaseName',
    key: 'databaseName',
  },
  {
    title: '主机地址',
    dataIndex: 'address',
    key: 'address',
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
    title: 'Action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
];

const data = [
  {
    id: '1',
    databaseName: 'fromdb',
    address: '192.168.0.1',
    port: '3306',
    databaseType: 'MySql',
  },
  {
    id: '2',
    databaseName: 'todb',
    address: '192.168.0.1',
    port: '3306',
    databaseType: 'MySql',
  },
  {
    id: '3',
    databaseName: 'test',
    address: '192.168.0.1',
    port: '3306',
    databaseType: 'MySql',
  },
];

export default {
  data() {
    return {
      data,
      columns,
      databaseList: [],
    };
  }, created() {
    this.get()
  }, methods: {
    async get() {
      let r = await getDatabaseList();
      this.databaseList = r.data
    }
  }
};
</script>
