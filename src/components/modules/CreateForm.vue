<template>
  <a-modal
    title="新建数据源"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>

        <a-form-item label="连接名称">
          <a-input v-decorator="['name', {rules: [{required: true, min: 1, message: '此项不能为空！'}]}]" />
        </a-form-item>
        <a-form-item label="主机名称">
          <a-input v-decorator="['hostName', {rules: [{required: true, min: 1, message: '此项不能为空！'}]}]" />
        </a-form-item>
        <a-form-item label="数据库名称">
          <a-input v-decorator="['databaseName', {rules: [{required: true, min: 1, message: '此项不能为空！'}]}]" />
        </a-form-item>
        <a-form-item label="数据库类型">
          <a-select
            label-in-value
            :default-value="{ key: 'lucy' }"
            style="width: 100%"
            @change="handleChange"
            v-decorator="['databaseType', {rules: [{required: true,message:'请选择数据库类型'}]}]"
          >
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="端口号">
          <a-input v-decorator="['port', {rules: [{required: true, min: 1, message: '此项不能为空'}]}]" />
        </a-form-item>
        <a-form-item label="用户名">
          <a-input v-decorator="['userName', {rules: [{required: true, min: 1, message: '此项不能为空！'}]}]" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input v-decorator="['password', {rules: [{required: true, min: 1, message: '此项不能为空！'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['description', 'id']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      form: this.$form.createForm(this)
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods:{
    handleChange(value) {
      console.log(value); // { key: "lucy", label: "Lucy (101)" }
    },
  }
}
</script>
