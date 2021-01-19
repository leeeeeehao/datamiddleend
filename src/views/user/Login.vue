<template>
    <div class="login-container">
    <div>
      <img style="margin-left:620px;margin-top:100px;width: 20%" src="../../assets/busneisslogo.png"/>
<!--      <h2 style="margin-left:700px; color: #999999">冠群数据中台</h2>-->
    </div>
    <a-form ref="form" :model="form" class="login-form">
      <h2 class="title"></h2>
      <a-form-item>
        <a-input class="inputBox" v-model="form.aoocuntNumber">
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input-password class="inputBox" v-model="form.aoocuntPwd">
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input-password>
      </a-form-item>
      <router-link to="/forGetPwd">
        <span class="forGetClass">忘记密码</span>
      </router-link>
      <a-form-item>
        <a-button class="submit" type="primary" @click="login">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {login} from '@/api/user/user.js'

export default {
  data() {
    return {
      form: {
        aoocuntNumber: "admin",
        aoocuntPwd: "admin"
      }
    }
  },
  methods: {
    async login()  {
      //
      // let res = await login({
      //   "accountNumber": this.form.aoocuntNumber,
      //   "accountPwd": this.form.aoocuntPwd
      // })
      // if (res.status !== true) return this.$msge(res.msg)
      // this.$msgs('登录成功')
      // window.sessionStorage.setItem('token', res.data)
      this.$router.push('/home')
    },
  },
}
</script>

<style  scoped>
.login-form {
  width: 565px;
  height: 372px;
  margin: 0 auto;
  padding: 40px 110px;
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/background.svg");
}

/* Log */
.login-title {
  color: #fff;
  text-align: center;
  margin: 150px 0;
  font-size: 48px;
  font-family: Microsoft Yahei;
}
/* 登陆按钮 */
.submit{
  width: 100%;
  height: 45px;
  font-size: 16px;
}
/* 用户登陆标题 */
.title{
  margin-bottom: 50px;
  color: #fff;
  font-weight: 700;
  font-size: 24px;
  font-family: Microsoft Yahei;
}
/*!* 输入框 *!*/
/*.inputBox{*/
/*  height: 45px;*/
/*}*/
/* 输入框内左边距50px */
.ant-input-affix-wrapper .ant-input:not(:first-child) {
    padding-left: 50px;
}

.forGetClass{
  color: #fff;
}
</style>
