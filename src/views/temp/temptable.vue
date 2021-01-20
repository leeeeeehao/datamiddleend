<template>
  <div id="app">
    <a-table ref="table" rowKey="id" :pagination="false" :columns="columns" :data-source="databaseList" :alert="true" bordered showPagination="auto">
      <span slot="action" slot-scope="{ id,name,databaseName}">
			  <a @click="gotoLink(databaseName)">查看</a>
			</span>
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
import {delDatabase, getDatabaseList, createDatabase} from "@/api/home/database";
import CreateForm from '@/components/modules/CreateForm'

const columns = [
  {title: '序号', dataIndex: 'id', key: 'id', scopedSlots: {customRender: 'id'}, width: 100},
  {title: '模板类型', dataIndex: 'name', key: 'name', },
  {title: '模板名称', dataIndex: 'databaseName', key: 'databaseName', },
  {title: '模板版本', dataIndex: 'hostName', key: 'hostName', ellipsis: true,},
  {title: '模板创建时间', dataIndex: 'port', key: 'port', ellipsis: true,},
  {title: '操作', align: "center", width: 100, key: 'action', scopedSlots: {customRender: 'action'},},
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
      this.pageIndex = r.data.pageNum
      this.pageSize = r.data.pageSize
    },
    del(databaseName) {
      let let_t = this
      let_t.$mc('确定要删除这个数据源吗?', async () => {
        let res = await delDatabase({
          "databaseName": databaseName
        })
        if (res.code != 200) return this.$msge('删除失败!');
        this.getList()
        return this.$msgs('删除成功!');
      });
    },
    onShowSizeChange(pageIndex, pageSize) {
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.getList()
    },
    handleAdd() {
      this.mdl = null
      this.visible = true
    },
    handleOk() {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh(true)

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            let r = this.createDatabase(values, form)

          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    async createDatabase(values, form) {
      let r = await createDatabase({
        "access": values.databaseType,
        "db": values.databaseName,
        "host": values.hostName,
        "name": values.name,
        "password": values.password,
        "port": values.port,
        "type": values.databaseType,
        "user": values.userName
      });
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      }).then(res => {
        this.visible = false
        this.confirmLoading = false
        // 重置表单数据
        form.resetFields()
        // 刷新表格
        this.getList()
        if (r.code != 200) {
          return this.$msgs('新增失败!' + r.message);
        } else {
          this.$message.info('新增成功')
        }

      })
    },
    gotoLink(databaseName) {
      console.log('databaseName', databaseName)
      // this.$router.replace('/tableList')
      this.$router.push({
        name: 'tempInfo',
        params: {
          databaseName: databaseName,
        }
      })
    }
  },
};
</script>
