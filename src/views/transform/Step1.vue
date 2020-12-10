<template>
  <div>
    <a-form :form="form" style="max-width: 500px; margin: 40px auto 0;">
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
      <h4>转账到支付宝账户</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
      <h4>转账到银行卡</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
    </div>
  </div>
</template>

<script>
import {getDatabaseList} from "@/api/home/database";

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
  },
  methods: {
    nextStep() {
      const {form: {validateFields}} = this
      // 先校验，通过表单校验后，才进入下一步
      validateFields((err, values) => {
        if (!err) {
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
