<template>
  <div id="main">
    <a-row>
      <a-col :span="12">
        <a-button type="primary" size="large" icon="plus" @click="addVisible">新增服务器</a-button>
      </a-col>
      <a-col :span="12"> 
        <a-input-search v-model:value="value" placeholder="请输入服务器名称" enter-button="搜索" size="large"
          @change="getServerPage" />
      </a-col>
    </a-row>

    <br />
    <a-table class="table" rowKey="serverId" :pagination="false" :columns="columns" :data-source="data">
      <span slot="action" slot-scope="{ serverId,serverIp }">
        <a @click="showUpdateInfo(serverId)">修改</a>
        <a-divider type="vertical" />
        <a @click="del(serverId)">删除</a>
        <a-divider type="vertical" />
        <a @click="clickWebShell(serverIp)">连接</a>
      </span>
    </a-table>
    <div class="divPagin">
      <a-pagination v-model:current="current" :page-size-options="pageSizeOptions" :total="count" show-size-changer
        :page-size="pageSize" @showSizeChange="onShowSizeChange" @change="getServerPage">
        <template #buildOptionText="props">
          <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
          <span v-else>全部</span>
        </template>
      </a-pagination>
    </div>


    <a-modal v-model:visible="visible" ok-text="确认" cancel-text="取消" title="新增服务器" width="800px" @ok="addServer">
      <a-form-model ref="ruleForm" :model="serverFrom" :rules="serverRules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-row>
          <a-col :span="14">
            <a-form-model-item label="服务器名称" prop="serverName">
              <a-input v-model="serverFrom.serverName" type="text" />
            </a-form-model-item>
          </a-col>
          <a-col :span="10">
            <a-form-model-item label="IP" prop="serverIp">
              <a-input v-model="serverFrom.serverIp" type="text" />
            </a-form-model-item>
          </a-col>
        </a-row>
        
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="操作系统" prop="osName">
              <a-select default-value="请选择"  style="width: 120px" @change="handleProvinceChange">
                <a-select-option v-for="province in serverFrom.osNameList" :key="province.osId" :value="province.osId">
                  {{ province.osName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>

          </a-col>
          <a-col :span="12">
            <a-form-model-item label="版本" prop="osVersion">
              <a-select default-value="请选择"  style="width: 120px" @change="handleSubChange">
                <a-select-option v-for="city in serverFrom.osVersionList" :key="city.osId" :value="city.osId">
                  {{ city.osName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="7">
            <a-form-model-item label="磁盘" prop="serverDisk">
              <a-input-number v-model="serverFrom.serverDisk" :min="20" :max="1024" :step="1" />
            </a-form-model-item>
          </a-col>
          <a-col :span="9">
            <a-form-model-item label="处理器" prop="serverProcessor">
              <a-input-number v-model="serverFrom.serverProcessor" :min="1" :max="24" :step="1" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="内存" prop="serverRam">
              <a-input-number v-model="serverFrom.serverRam" :min="20" :max="2048" :step="1" />
            </a-form-model-item>
          </a-col>
        </a-row>
        
      </a-form-model>
    </a-modal>

    <a-modal v-model="updateVisible" ok-text="确认" cancel-text="取消" title="修改服务器信息" width="800px" @ok="updateServer">
      <a-form-model ref="ruleUpdateForm" v-model:model="oneServerList" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="创建时间" prop="createTime">
            <a-input v-model="oneServerList.createTime" type="text" disabled />
          </a-form-model-item>
          <a-form-model-item label="创建人" prop="createUser">
            <a-input v-model="oneServerList.createUser" type="text" disabled />
          </a-form-model-item>
            <a-form-model-item label="服务器名称" prop="serverName">
              <a-input v-model="oneServerList.serverName" type="text" />
            </a-form-model-item>
            <a-form-model-item label="IP" prop="serverIp">
              <a-input v-model="oneServerList.serverIp" type="text" />
            </a-form-model-item>

            <a-form-model-item label="操作系统">
              <a-select v-model="oneServerList.osId" style="width: 120px" @change="updSelectChange">
                <a-select-option v-for="pro in osNameUpdList" :key="pro.osId" :value="pro.osId">
                  {{ pro.osName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="版本" prop="osVersion">
              <a-select v-model="oneServerList.osVersionId" style="width: 120px">
                <a-select-option v-for="pro in osVersionUpdList" :key="pro.osId" :value="pro.osId">
                  {{ pro.osName }}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item label="磁盘" prop="serverDisk">
              <a-input-number v-model="oneServerList.serverDisk" :min="20" :max="1024" :step="1" />
            </a-form-model-item>
            <a-form-model-item label="处理器" prop="serverProcessor">
              <a-input-number v-model="oneServerList.serverProcessor" :min="1" :max="24" :step="1" />
            </a-form-model-item>
            <a-form-model-item label="内存" prop="serverRam">
              <a-input-number v-model="oneServerList.serverRam" :min="20" :max="2048" :step="1" />
            </a-form-model-item>

      </a-form-model>
    </a-modal>

    <a-modal v-model="webshellVisble" ok-text="确认" cancel-text="取消" title="连接服务器" width="80%" >
        <iframe :src='webSubmitList.src' width="100%" height="600px"></iframe>
    </a-modal>

  
  </div>
</template>

<script>
  import {
    selectPage,
    delServer,
    addServer,
    selectOne,
    getOperating,
    selClusterVersionList,
    updateGetOne
  } from '@/api/home/systemVersion.js'
  import {
    getProfile
  } from '@/api/user/user.js'
  import {message} from 'ant-design-vue'

  const columns = [{
    title: '编号',
    dataIndex: 'serverId',
    key: 'serverId',
  },
  {
    title: '服务器名称',
    dataIndex: 'serverName',
    key: 'serverName',
  },
  {
    title: '操作系统',
    dataIndex: 'osName',
    key: 'osName',
  },
  {
    title: '版本',
    key: 'osVersion',
    dataIndex: 'osVersion',
  },
  {
    title: 'IP',
    key: 'serverIp',
    dataIndex: 'serverIp',
  },
  {
    title: '磁盘',
    key: 'serverDisk',
    dataIndex: 'serverDisk',
  },
  {
    title: '处理器',
    key: 'serverProcessor',
    dataIndex: 'serverProcessor',
  },
  {
    title: '内存',
    key: 'serverRam',
    dataIndex: 'serverRam',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: {
      customRender: 'action'
    },
  },
  ];

  export default {
    data() {
      return {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
        data: [],
        columns,
        current: 1,
        count: 0,
        pageSize: 10,
        pageSizeOptions: ['1', '3', '5', '10', '50'],
        value: '',
        accountList: [],
        visible: false,
        serverFrom:{
          osNameList:[],
          osVersionList:[],
          serverName:'',
          osNameId:'',
          osVersionId:'',
          serverIp:'',
          serverDisk:'20',
          serverProcessor:'1',
          serverRam:'20',
        },
        serverRules:{
          serverName:[{required: true, message: '请输入服务器名称', trigger: 'blur' }],
          serverIp:[{required: true, message: '请输入IP', trigger: 'blur' }],
          serverDisk:[{required: true, message: '请输入磁盘', trigger: 'blur' }],
          serverProcessor:[{required: true, message: '请输入处理器', trigger: 'blur' }],
          serverRam:[{required: true, message: '请输入内存', trigger: 'blur' }],
          // osName:[{required: true, message: '请选择操作系统', trigger: 'blur' }],
          // osVersion:[{required: true, message: '请选择版本', trigger: 'blur' }],
        },
        updateVisible:false,
        oneServerList:[],
        osNameUpdList:[],
        osVersionUpdList:[],

        webshellVisble:false,
        webSubmitList:{
          src:'',
        },

      };
    },
    created() {
      this.getAccountInfo()
      this.getServerPage()
    },
    methods: {
      async getServerPage() {
        let res = await selectPage({
          "pageIndex": this.current,
          "pageSize": this.pageSize,
          "serverName": this.value
        })
        if (res.status !== true) return this.$msge('获取服务器列表失败!')
        this.data = res.data.list
        this.count = res.data.totalCount
      },
      del(serverId) {
        let let_t = this
        let_t.$mc('确定删除吗?', async () => {
          let res = await delServer({
            "serverId": serverId,
            "deleteUser": let_t.accountList.accountNickName
          })
          if (res.status !== true) return this.$msge('删除失败!');
          this.getServerPage()
          return this.$msgs('删除成功!');
        });
      },
      async getAccountInfo() {
        let res = await getProfile();
        if (res.status !== true) return this.$msge(res.msg)
        this.accountList = res.data
      },
      onShowSizeChange(current, pageSize) {
        this.pageSize = pageSize;
        this.getServerPage()
      },
      addServer() {
        this.$refs.ruleForm.validate(async valid => {
          if (valid) {
            console.log(this.serverFrom)
            let res = await addServer({
              "serverName":this.serverFrom.serverName,
              "serverIp":this.serverFrom.serverIp,
              "serverDisk":this.serverFrom.serverDisk,
              "serverProcessor":this.serverFrom.serverProcessor,
              "serverRam":this.serverFrom.serverRam,
              "osId":this.serverFrom.osNameId,
              "osVersionId":this.serverFrom.osVersionId,
              "createUser":this.accountList.accountNickName
            })
            if(res.status !== true) return this.$msge(res.msg)
            this.visible = false
            this.getServerPage()
            return this.$msgs('添加成功!')

          } else {
            console.log('error submit!!');
            return false;
          }
        });
        // this.visible = false
      },
      async handleProvinceChange(value) {
        this.serverFrom.osNameId=value
        let res = await getOperating(value)
        this.serverFrom.osVersionList = res.data
      },
      handleSubChange(val){
        this.serverFrom.osVersionId = val
      },
      async updateServer(){
        var param ={
          serverId: this.oneServerList.serverId,
          osId: this.oneServerList.osId,
          osVersionId: this.oneServerList.osVersionId,
          serverDisk: this.oneServerList.serverDisk,
          serverIp: this.oneServerList.serverIp,
          serverName: this.oneServerList.serverName,
          serverProcessor: this.oneServerList.serverProcessor,
          serverRam: this.oneServerList.serverRam,
          updateUser: this.accountList.accountNickName
        }
        console.log(param)
        let res = await this.$vput('serverInfo/modify',param)
        console.log(res.data)
        if(res.data.status !== true) return this.$msge('修改失败')
        this.updateVisible = false
        this.getServerPage()
        return this.$msgs('修改成功!')
      },
      async showUpdateInfo(serverId){
        this.updateVisible = true
        let res = await updateGetOne(serverId)
        console.log(res);
        if(res.status !== true) return this.$msge('获取服务器信息失败!');
        this.oneServerList = res.data

        let pro = await getOperating(0)
        if(pro.status !== true) return this.$msge('获取操作系统列表失败')
        this.osNameUpdList = pro.data
      },
      clickWebShell(serverIp){
        this.webshellVisble = true
        this.webSubmitList.src='http://192.168.2.43:8880/websshpage?host='+serverIp
        console.log(this.webSubmitList.src)
      },
      async addVisible(){
        this.visible = true
        let res = await getOperating(0)
        if(res.status !== true) return this.$msge('获取操作系统列表失败')
        this.serverFrom.osNameList = res.data
      },
      async updSelectChange(val){
        let res = await getOperating(val)
        this.osVersionUpdList = res.data
      },

    }
  };

</script>

<style lang="scss" scoped>
  .table {
    min-height: 530px !important;
  }
  .webLoginDivClass{
    width: 30%;
    margin-left: 40%;
  }
  .webLoginDivLoginButtonClass{
      margin-top: 10px;
      margin-left: 45%;
    }
</style>