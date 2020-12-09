<template>
  <div id="app">
    <a-table rowKey="id" :pagination="false" :columns="columns" :data-source="databaseList">
      <span slot="action" slot-scope="{ idTransformation,name}">
			  <a @click="del(name)">删除</a>
			  <a-divider type="vertical"/>
			  <a @click="">修改</a>
			</span>
    </a-table>

    <div class="divPagin">
      <a-pagination v-model:current="pageIndex" :page-size-options="pageSizeOptions" :total="count" show-size-changer
                    :page-size="pageSize" @showSizeChange="onShowSizeChange" @change="getList">
        <template #buildOptionText="props">
          <span v-if="props.value !== '50'">{{ props.value }}</span>
        </template>
      </a-pagination>
    </div>
  </div>
</template>
<script>

  import {getTransformList, delTransform} from "@/api/home/transform";

  const columns = [
    {
      title: '序号',
      dataIndex: 'idTransformation',
      key: 'idTransformation',
      scopedSlots: {customRender: 'idTransformation'},
      width: 100
    },
    {
      title: '转换名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建人',
      dataIndex: 'createdUser',
      key: 'createdUser',
    },
    {
      title: '创建日期',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: '更新日期',
      dataIndex: 'modifiedDate',
      key: 'modifiedDate',
    },
    {
      title: '备注',
      dataIndex: 'description',
      key: 'description',
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
        pageSize: 5,
        pageSizeOptions: ['1', '3', '5'],
        count: 0,
        columns,
        databaseList: [],
      };
    },
    created() {
      this.getList()
    },
    methods: {
      async getList() {
        let r = await getTransformList(
          this.pageIndex,
          this.pageSize
        );
        this.databaseList = r.data.list;
        this.count = r.data.total;
        console.log(r.data.total);
      },
      del(tranName) {
        let let_t = this
        let_t.$mc('确定要删除这个转换吗?', async () => {
          let res = await delTransform({
            "tranName": tranName
          })
          if (res.code != 200) return this.$msge('删除失败!');
          this.getList()
          return this.$msgs('删除成功!');
        });
      },
      onShowSizeChange(pageIndex, pageSize) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.getList();
      }
    }
  };
</script>
