<template>
  <div id="app">

    <div id="create">
      <a-button type="primary" icon="plus" @click="handleAdd">新建转换</a-button>
      <create-form-trans
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </div>
    <br>
    <a-table rowKey="key" :pagination="false" :columns="columns" :data-source="databaseList">
      <span slot="action" slot-scope="{ idTransformation,name}">
			  <a @click="del(name)">删除</a>
			  <a-divider type="vertical"/>
			  <a @click="gotoLink()">编辑</a>
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

import {getTransformList, delTransform, createTransform} from "@/api/home/transform";
import CreateFormTrans from "@/components/modules/CreateFormTrans";

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
      databaseList: [],
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
    gotoLink() {
      this.$router.replace('/transformEdit')
    }
  }
};
</script>
