<template>
  <div>

    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">

      <a-alert
        :closable="true"
        message="请依序填写抽取名称、选择数据库连接、填写抽取的SQL"
        style="margin-bottom: 24px; "
      />
      <a-form-item
        label="抽取名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', { initialValue: '抽取', rules: [{required: true, message: '请填写抽取名称'}] }]"/>
      </a-form-item>
      <a-form-item
        label="数据库连接"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="请选择数据库连接"
          v-decorator="['dbConnection', { rules: [{required: true, message: '数据库连接'}] }]">
          <a-select-option v-for="item in databaseList" :key="item.databaseName" :value="item.databaseName" >{{ item.databaseName }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="SQL"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-textarea v-decorator="['sql', { rules: [{required: true, message: '请填写抽取SQL'}] }]"/>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button type="primary" @click="nextStep">下一步</a-button>
      </a-form-item>
    </a-form>
    <a-divider/>
    <div class="step-form-style-desc">
      <h3>说明</h3>
      <h4>填写抽取信息</h4>
      <p>填写必须的数据库信息与抽取SQL，点击下一步。</p>
      <h4>填写目标库信息</h4>
      <p>填写必须的数据库信息、目标表与插入字段的映射关系，点击完成保存任务。</p>
    </div>
  </div>
</template>

<script>
import {getDatabaseList} from "@/api/home/database";
import pick from "lodash.pick";

// 表单字段
const fields = ['stepName', 'databaseName','sql']

export default {
  name: 'Step1',
  data() {
    return {
      labelCol: {lg: {span: 5}, sm: {span: 5}},
      wrapperCol: {lg: {span: 19}, sm: {span: 19}},
      form: this.$form.createForm(this),
      databaseList: [],
    }
  },
  created() {
    this.getDatabaseInfo()
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    nextStep() {
      const {form: {validateFields}} = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
          // console.log('sql',values.sql)
          // console.log('转换名称',values.name)
          // console.log('数据库连接',values.dbConnection)
          sessionStorage.setItem('dbConnection', values.dbConnection);
          sessionStorage.setItem('sql', values.sql);
          sessionStorage.setItem('name', values.name);
          this.$emit('nextStep')

        }
      })
    },
    async getDatabaseInfo(){
      let r = await getDatabaseList({
        "pageIndex": 1,
        "pageSize": 99
      });
      this.databaseList = r.data.list
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0, 0, 0, .45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0, 0, 0, .45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0, 0, 0, .45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
