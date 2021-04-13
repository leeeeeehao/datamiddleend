<template>
  <div id="app">
    <br>
    <a-table rowKey="key" :pagination="false" :columns="columns" :data-source="licenseTypeList">
      <span slot="action" slot-scope="{ typeId,typeCode}">
<!--			  <a @click="del(name)">删除</a>-->
<!--			  <a-divider type="vertical"/>-->
<!--			  <a @click="gotoLink(name)">编辑</a>-->
<!--        <a-divider type="vertical"/>-->
        <a @click="start(typeCode)">开始</a>
        <a-divider type="vertical"/>
        <a @click="stop(typeCode)">暂停</a>
			</span>
    </a-table>

    <!--    <div class="divPagin">-->
    <!--      <a-pagination v-model:current="pageIndex" :page-size-options="pageSizeOptions" :total="count" show-size-changer-->
    <!--                    :page-size="pageSize" @showSizeChange="onShowSizeChange" @change="getList">-->
    <!--        <template #buildOptionText="props">-->
    <!--          <span v-if="props.value !== '50'">{{ props.value }}</span>-->
    <!--        </template>-->
    <!--      </a-pagination>-->
    <!--    </div>-->
  </div>
</template>
<script>

import {delTransform, createTransform, getTypeList, start, stop} from "@/api/home/transform";
import CreateFormTrans from "@/components/modules/CreateFormTrans";
import {previewLogsTransform} from "@/api/home/transform";

const columns = [
  {
    title: '序号',
    dataIndex: 'typeId',
    key: 'typeId',
    customRender: (text, record, index) =>
      `${
        index + 1}`,
    width: 100
  },
  {
    title: '证照类型名称',
    dataIndex: 'typeName',
    key: 'typeName',
  },
  {
    title: '证照分类代码',
    dataIndex: 'typeCode',
    key: 'typeCode',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },
];

export default {
  components: {
    CreateFormTrans
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 5,
      pageSizeOptions: ['1', '3', '9'],
      count: 0,
      columns,
      licenseTypeList: [],
      mdl: null,
      visible: false,//是否显示表单
      confirmLoading: false,
    };
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      let r = await getTypeList();
      this.licenseTypeList = r.data;
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
    async create(values, form) {
      let r = await createTransform({
        "tranName": values.name,
        "tranDesc": values.desc
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
    async start(typeCode) {
      let let_t = this
      let_t.$mc('确定要执行这个转换吗?', async () => {
        let r = await start({
          "type": typeCode
        })
        if (r.code != 20000) {
          return this.$msge('执行失败!');
        } else {
          this.$message.info('执行成功,正在生成中')
          console.log('message', r.message);
        }
      });

    },
    async stop(typeCode) {
      let let_t = this
      let_t.$mc('确定要暂停这个转换吗?', async () => {
        let r = await stop(typeCode)
        if (r.code != 20000) {
          return this.$msge('暂停失败!');
        } else {
          this.$message.info('暂停成功,服务正在关闭中')
          console.log('message', r.message);
        }
      });

    },
    onShowSizeChange(pageIndex, pageSize) {
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.getList();
    },
    handleAdd() {
      this.mdl = null
      this.visible = true
    },
    handleCancel() {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
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
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            this.create(values, form)

          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    gotoLink(name) {
      console.log(name)
      this.$router.push({
        name: 'transformEdit',
        params: {
          transName: name
        }
      })
    }
  }
};
</script>
