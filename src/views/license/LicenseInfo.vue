<template>
  <div style="background-color: #ececec; padding: 20px;">
    <a-row :gutter="16">
      <a-col>
        <a-card title="生成证照预览图" :bordered="true">
          <a-card-grid style="width:100%;text-align:center">
            <img :src="this.infoData.sysPath"/>
            <a-card-meta title="身份证" style="margin-top: 10px">
            </a-card-meta>
          </a-card-grid>

        </a-card>
      </a-col>

    </a-row>
    <a-descriptions style="margin-top: 10px" title="用户信息" bordered>
      <a-descriptions-item label="身份证号码">
        {{ this.infoData.certificateNumber }}
      </a-descriptions-item>
      <a-descriptions-item label="姓名">
        {{ this.infoData.licenesHolderName }}
      </a-descriptions-item>
      <a-descriptions-item label="当前状态">
        {{ this.infoData.licenesStatus }}
      </a-descriptions-item>
      <a-descriptions-item label="证照生成时间">
        {{ this.infoData.createTime }}
      </a-descriptions-item>
      <a-descriptions-item label="证照更新时间" :span="2">
        {{ this.infoData.updateTime }}
      </a-descriptions-item>

    </a-descriptions>
  </div>
</template>
<script>
import {licenseInfo, licenseTypes} from "@/api/home/licenseManagement";

const columns = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: {customRender: 'id'},
    width: 100
  },
  {
    title: '扩展字段',
    dataIndex: 'kzKey',
    key: 'kzKey',
  },
  {
    title: '扩展字段名称',
    dataIndex: 'kzName',
    key: 'kzName',
  },
  {
    title: '字段类型',
    dataIndex: 'type',
    key: 'type',
    ellipsis: true,
  },
  {
    title: '字段长度',
    dataIndex: 'length',
    key: 'length',
    ellipsis: true,
  }
];
export default {
  data() {
    return {
      pageIndex: 1,//页码
      pageSize: 10,//页面条数
      pageSizeOptions: ['1', '3', '9'],//页面条数选项
      count: 0,//结果最大数量
      columns,
      kzList: [
        {id: 1, kzKey: "KZ_XM", kzName: "姓名", type: "varchar", length: 12},
        {id: 2, kzKey: "KZ_MZ", kzName: "民族", type: "varchar", length: 12},
        {id: 3, kzKey: "KZ_XB", kzName: "性别", type: "varchar", length: 12},
        {id: 4, kzKey: "KZ_CSRQ", kzName: "出生日期", type: "varchar", length: 12},
        {id: 5, kzKey: "KZ_ZZ", kzName: "住址", type: "varchar", length: 12},
      ],
      infoId: 0,//证照信息ID
      infoData: {
        licenesHolderName: "",
        sysPath: "",
        licenesStatus: 0,
        createTime: "",
        updateTime: "",
        certificateNumber: "",

      }
    };
  }, created() {
    this.infoId = this.$route.params.infoId
    this.getLicenseInfo()
  },
  methods: {
    // onShowSizeChange(pageIndex, pageSize) {
    //   this.pageIndex = pageIndex;
    //   this.pageSize = pageSize;
    //   // this.getList()
    // },
    async getLicenseInfo() {

      let r = await licenseInfo(this.infoId);
      this.infoData = r.data
      console.log("获取证照信息" + this.infoData.createTime)
    },
  },

}
</script>
