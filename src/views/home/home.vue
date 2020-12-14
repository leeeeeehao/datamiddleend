<template>
  <a-layout class="layout">
    <a-layout-sider class="left-menu" v-model="collapsed" :trigger="null" collapsible>
      <div class="logo" style="background: none"><img style="width: 40px" src="../../assets/logo2.png">{{ collapsed ? '冠群' : '数据中台' }}</div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <!--        <a-sub-menu :key='item.menuId' v-for="item in menuList ">-->
        <!--          <span slot="title">-->
        <!--            <a-icon :type="item.menuIcon" />-->
        <!--            <span>{{item.menuName}}</span>-->
        <!--          </span>-->

        <!--          <a-menu-item :key="subItem.menuId" v-for="subItem in item.childrens">-->
        <!--            <router-link :to="subItem.menuPath">-->
        <!--              <a-icon :type="subItem.menuIcon" />-->
        <!--              <span>{{subItem.menuName}}</span>-->
        <!--            </router-link>-->
        <!--          </a-menu-item>-->

        <!--        </a-sub-menu>-->
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="database"/><span>数据源</span></span>
          <a-menu-item key="1">
            <router-link to="/databaseList">
              <span><a-icon type="unordered-list"/>数据源列表</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="pull-request"/><span>数据抽取</span></span>
          <a-menu-item key="2">
            <router-link to="/transformList">
              <span><a-icon type="unordered-list"/>数据转换列表</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="form"/><span>日志</span></span>
          <a-menu-item key="3">
            <span><a-icon type="unordered-list"/>日志列表</span>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title"><a-icon type="user" /><span>个人设置</span></span>
          <a-menu-item key="4">
            <span><a-icon type="unordered-list"/>设置</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="() => (collapsed = !collapsed)"/>
        <a-dropdown class="flex">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            欢迎您:{{ accountList.accountNickName }}
            <a-icon type="down"/>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <router-link to="/displayPersonalInfo">
                <a href="javascript:;">
                  <a-icon type="edit"/>
                  个人信息</a>
              </router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link to="/changePersonalPwd">
                <a href="javascript:;">
                  <a-icon type="lock"/>
                  修改密码</a>
              </router-link>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="logout()">
                <a-icon type="logout"/>
                退出</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>

      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <Bread></Bread>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import Bread from '@/components/common/Bread.vue';
import {getMenuList} from '@/api/home/home.js'
import {getProfile} from '@/api/user/user.js'

export default {
  components: {Bread},
  data() {
    return {
      collapsed: false,
      menuList: [],
      accountList: []
    };
  },
  created() {
    // this.getMenu()
    // this.getAccountInfo()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
      this.$msgs('退出成功');
    },
    async getMenu() {
      let res = await getMenuList();
      if (res.status !== true) return this.$msge('加载菜单列表失败!');
      this.menuList = res.data
    },
    async getAccountInfo() {
      let res = await getProfile();
      if (res.status !== true) return this.$msge(res.msg)
      this.accountList = res.data
    }
  }
};
</script>
<style lang='scss' scoped>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track-piece {
  background-color: rgb(17, 16, 16);
  -webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:vertical {
  height: 5px;
  background-color: rgb(68, 68, 66);
  -webkit-border-radius: 6px;
}

.layout {
  height: 100vh;

  .logo {
    height: 32px;
    line-height: 32px;
    color: #fff;
    text-align: center;
    letter-spacing: 2px;

    font: {
      size: 18px;
      weight: bold;
      family: 楷体;
    }

    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }

  .flex {
    float: right;
    margin-right: 20px;
  }

  .left-menu {
    overflow-y: scroll;
  }
}
</style>
