<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
      <a-alert
        :closable="true"
        message="确认提交后，将保存这个执行方案"
        style="margin-bottom: 24px; "
      />

      <a-form-item
        label="步骤名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['stepName', { initialValue: '表输出', rules: [{required: true, message: '请填写提交记录数量'}] }]"/>
      </a-form-item>
      <a-form-item
        label="数据库连接"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="请选择数据库连接"
          @change="handleChange"
          v-decorator="['dbConnection', {initialValue: this.defaultDatabase, rules: [{required: true, message: '请选择一个数据库连接'}] }]"

        >
          <a-select-option v-for="item in databaseList" :key="item.databaseName" :value="item.databaseName" >{{ item.databaseName }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        label="目标表"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          placeholder="请选择目标表"
          v-decorator="['dbTargetTable', {rules: [{required: true, message: '请选择一个目标表'}] }]"
          ref="vendorId"
        >
          <a-select-option v-for="x in databaseInfoList" :key="x.text" :value="x.text" >{{ x.text }}</a-select-option>
        </a-select>

      </a-form-item>

      <a-form-item
        label="提交记录数量"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input v-decorator="['commitSize', { initialValue: 50, rules: [{required: true, message: '请填写提交记录数量'}] }]"/>
      </a-form-item>

      <a-form-item
        label="收款人姓名"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        Alex
      </a-form-item>
      <a-form-item
        label="转账金额"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        ￥ 5,000.00
      </a-form-item>
      <a-divider/>
      <a-form-item
        label="支付密码"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        class="stepFormText"
      >
        <a-input
          type="password"
          style="width: 80%;"
          v-decorator="['paymentPassword', { initialValue: '123456', rules: [{required: true, message: '请输入支付密码'}] }]"/>
      </a-form-item>
      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button :loading="loading" type="primary" @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {getDatabaseInfo, getDatabaseList} from "@/api/home/database";

export default {
  name: 'Step2',
  data() {
    return {

      labelCol: {lg: {span: 5}, sm: {span: 5}},
      wrapperCol: {lg: {span: 19}, sm: {span: 19}},
      form: this.$form.createForm(this),
      loading: false,
      timer: 0,
      databaseList: [],
      databaseInfoList:[] ,
      defaultDatabase:'1',
    }
  },
  created() {
    this.getDatabaseList()
    // this.getInfoList()
  },
  methods: {
    nextStep() {
      const that = this
      const {form: {validateFields}} = this
      that.loading = true
      validateFields((err, values) => {
        if (!err) {
          console.log('表单 values', values)
          that.timer = setTimeout(function () {
            that.loading = false
            that.$emit('nextStep')
          }, 1500)
        } else {
          that.loading = false
        }
      })
    },
    async getDatabaseList(){
      let r = await getDatabaseList({
        "pageIndex": 1,
        "pageSize": 99
      });
      this.databaseList = r.data.list
      console.log('values', r.data.list[0].databaseName)
      this.defaultDatabase = r.data.list[0].databaseName
      this.getInfoList()
    },
    async getInfoList() {
      let r = await getDatabaseInfo({
        "databaseName": this.defaultDatabase,
        "includeElement": 0,
        "nodeId": "table"
      });
      this.databaseInfoList = r.data
    },
    prevStep() {
      this.$emit('prevStep')
    },
    handleChange(value) {
      console.log(value); // { key: "lucy", label: "Lucy (101)" }
      this.defaultDatabase = value
      this.getInfoList()
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },

}
</script>

<style lang="less" scoped>
.stepFormText {
  margin-bottom: 24px;

  .ant-form-item-label,
  .ant-form-item-control {
    line-height: 22px;
  }
}

</style>
