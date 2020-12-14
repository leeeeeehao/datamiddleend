<template>
  <div>
    <a-form :form="form" style="max-width: 650px; margin: 40px auto 0;">
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
          <a-select-option v-for="item in databaseList" :key="item.databaseName" :value="item.databaseName">
            {{ item.databaseName }}
          </a-select-option>
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
          <a-select-option v-for="x in databaseInfoList" :key="x.text" :value="x.text">{{ x.text }}</a-select-option>
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
      <a-divider/>

      <a-form-model
        ref="dynamicValidateForm"
        :model="dynamicValidateForm"
        v-bind="formItemLayoutWithOutLabel"
        style="margin-left: 25px"
      >
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-model-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :key="domain.key"
              v-bind="index === 0 ? formItemLayout : {}"
              :label="index === 0 ? '目标:' : ''"
              :prop="'domains.' + index + '.value'"
              :rules="{

        required: true,
        message: '表字段不能为空',
        trigger: 'blur',
      }"
            >
              <a-input
                v-model="domain.value"
                placeholder="目标表字段"
                style="width: 70%; margin-right: 0px;margin-left: 20px"
              />
              <!--          <a-icon-->
              <!--            v-if="dynamicValidateForm.domains.length > 1"-->
              <!--            class="dynamic-delete-button"-->
              <!--            type="minus-circle-o"-->
              <!--            :disabled="dynamicValidateForm.domains.length === 1"-->
              <!--            @click="removeDomain(domain)"-->
              <!--          />-->
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item
              v-for="(domain2, index2) in dynamicValidateForm.domains2"
              :key="domain2.key"
              v-bind="index2 === 0 ? formItemLayout : {}"
              :label="index2 === 0 ? '源:' : ''"
              :prop="'domains.' + index2 + '.value'"
              :rules="{
        required: true,
        message: '流字段不能为空',
        trigger: 'blur',
      }"
            >
              <a-input
                v-model="domain2.value"
                placeholder="源表字段"
                style="width: 70%; margin-right: 8px ;margin-left: 20px"
              />
              <a-icon
                v-if="dynamicValidateForm.domains2.length > 1"
                class="dynamic-delete-button"
                type="minus-circle-o"
                :disabled="dynamicValidateForm.domains2.length === 1"
                @click="removeDomain(domain2)"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item v-bind="formItemLayoutWithOutLabel">
          <a-button type="dashed" style="width: 60%;margin-left: 40px" @click="addDomain">
            <a-icon type="plus"/>
            添加字段映射
          </a-button>
        </a-form-model-item>


      </a-form-model>

      <a-form-item :wrapperCol="{span: 19, offset: 5}">
        <a-button :loading="loading" type="primary" @click="nextStep">提交</a-button>
        <a-button style="margin-left: 8px" @click="prevStep">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {getDatabaseInfo, getDatabaseList} from "@/api/home/database";
import {editTransform} from "@/api/home/transform";

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
      databaseInfoList: [],
      defaultDatabase: '1',
      formItemLayout: {
        labelCol: {
          xs: {span: 24},
          sm: {span: 4},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 20},
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: {span: 24, offset: 0},
          sm: {span: 20, offset: 4},
        },
      },
      dynamicValidateForm: {
        domains: [],
        domains2: []
      },
      values: '',
      transName: '',
    }
  },
  created() {

    this.getDatabaseList()
    this.values = sessionStorage.getItem('step1Values').dbConnection;
    this.transName = sessionStorage.getItem('transName');
    console.log('----------', this.values);
    console.log('----------', this.transName);
    // this.getInfoList()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.domains2.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
        this.dynamicValidateForm.domains2.splice(index, 1);
      }
    },
    addDomain() {

      // console.log('values2',this.dynamicValidateForm.domains2)
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now(),
      });
      this.dynamicValidateForm.domains2.push({
        value: '',
        key: Date.now() + 1,
      });
    },
    nextStep() {
      const that = this
      const {form: {validateFields}} = this
      that.loading = true
      validateFields((err, values) => {
        if (!err) {
          let r = this.editTrans(values)
          if (r.code = 500) {
            that.timer = setTimeout(function () {
              that.loading = false
              that.$emit('nextStep')
            }, 1500)
          } else {
            that.loading = false
          }
        } else {
          that.loading = false
        }
      })
    },
    async getDatabaseList() {
      let r = await getDatabaseList({
        "pageIndex": 1,
        "pageSize": 99
      });
      this.databaseList = r.data.list
      // console.log('values', r.data.list[0].databaseName)
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
    async editTrans(values) {
      let arr = []
      for (let i in this.dynamicValidateForm.domains) {
        arr.push(this.dynamicValidateForm.domains[i].value)
      }
      console.log('values', arr)
      let arr2 = []
      for (let z in this.dynamicValidateForm.domains2) {
        arr2.push(this.dynamicValidateForm.domains2[z].value)
      }
      console.log('values', arr2)
      let r = await editTransform({
        "transName": sessionStorage.getItem('transName'),
        "tableInput": {
          "databaseName": sessionStorage.getItem('dbConnection'),
          "sql": sessionStorage.getItem('sql'),
          "stepName": sessionStorage.getItem('name'),
        },
        "tableOutput": {
          "commitSize": values.commitSize,
          "databaseName": values.dbConnection,
          "stepName": values.stepName,
          "streamFields": arr2,
          "tableFields": arr,
          "tableName": values.dbTargetTable
        }
      });
      return r;
    },
    prevStep() {
      this.$emit('prevStep')
    },
    handleChange(value) {
      // console.log(value); // { key: "lucy", label: "Lucy (101)" }
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

.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}

.dynamic-delete-button:hover {
  color: #777;
}

.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
