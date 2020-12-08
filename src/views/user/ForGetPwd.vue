<template>
    <div class='main'>
        <router-link to="/login">
        <a-button type="primary">返回首页</a-button>
        </router-link>
        <a-steps :current="current">
            <a-step title="填写账号" />
            <a-step title="身份验证" />
            <a-step title="设置新密码" />
            <a-step title="完成" />
        </a-steps>
        <div class="divform">
            <a-form :label-col="labelCol" :wrapper-col="wrapperCol" ref="formRef" :model="createForm"
                :rules="createFormRules">

                <div v-if="current == 0">
                    <a-form-item prop="loginName">
                        <a-input placeholder="请输入内容" v-model="createForm.loginName">
                        </a-input>
                    </a-form-item>
                    <a-button type="primary" @click="goActiveTwo">确定</a-button>
                </div>

                <div v-if="current == 1">
                    <a-form-item prop="email">
                        <a-input placeholder="请输入内容" v-model="createForm.jmEmail" addon-before="邮箱" disabled>
                        </a-input>
                    </a-form-item>
                    <a-button v-show="show" type="primary" @click="sendForGetPwd">发送验证码</a-button>
                    <div v-show="!show" class="count">{{count}} s</div>
                    <a-form-item prop="verificationCode">
                        <a-input placeholder="请输入内容" v-model="createForm.verificationCode" addon-before="验证码">
                        </a-input>
                    </a-form-item>
                    <a-button type="primary" @click="verificationForGetPwd">验证</a-button>
                </div>

                <div v-if="current == 2">
                    <a-form-item  prop="newPwd">
                        <a-input placeholder="请输入新密码" v-model="createForm.newPwd" addon-before="新密码" >
                        </a-input>
                    </a-form-item>
                    <a-form-item  prop="qrPwd">
                        <a-input placeholder="请输入确认密码" v-model="createForm.qrPwd" addon-before="确认密码">
                        </a-input>
                    </a-form-item>
                    <a-button type="primary" @click="forGetUpdateAccountPwd">修改</a-button>
                </div>	

                <div v-if="current == 3">
                    <a-result
                    status="success"
                    title="修改密码成功!"
                  >
                    <template #extra>
                    <router-link to="/login">
                        <a-button key="console" type="primary">
                            去登录
                        </a-button>
                    </router-link>
                    </template>
                  </a-result>
                </div>	



            </a-form>
        </div>
    </div>
</template>


<script>
    import { queryEmailAcountByNumber, sendEmail ,updateAccountPwd,validation} from '@/api/user/user.js'

    export default {
        data() {
            return {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
                current: 0,
                createForm: {
                    loginName: 'sysadmin',
                    email: '',
                    verificationCode: '',
                    newPwd: '',
                    accId: '',
                    qrPwd: '',
                    jmEmail: ''
                },
                createFormRules: [

                ],
                show: true,
                count: '',
                timer: null,
            }
        },
        methods: {
            getCode() {
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },
            async goActiveTwo() {
                let res = await queryEmailAcountByNumber({
                    "accountNumber": this.createForm.loginName
                })
                if (res.status !== true) return this.$msge(res.msg)
                let em = res.data.email
                em = em.substring(0, 3) + "*********";
                this.createForm.email = res.data.email
                this.createForm.accId = res.data.accountId
                this.createForm.jmEmail = em
                this.current = 1
                return this.$msgs("账号正确")
                console.log(this.createForm)
            },
            async sendForGetPwd() {
                let res = await sendEmail({
                    "accountNumber": this.createForm.loginName,
                    "accountEmail": this.createForm.email
                })
                if (res.status !== true) return this.$msge(res.msg)
                this.getCode();
                return this.$msgs(res.msg)
            },
            async verificationForGetPwd() {
                let res = await validation({
                    "accountNumber": this.createForm.loginName,
                    "verificationCode": this.createForm.verificationCode
                })
                if (res.status !== true) return this.$msge(res.msg)
                this.current = 2
                return this.$msgs(res.msg)
            },
            async forGetUpdateAccountPwd() {
                    let res = await updateAccountPwd({
                        "accountId": this.createForm.accId,
                        "accountPwd": this.createForm.newPwd
                    })
                    if (res.status !== true) return this.$msge(res.msg)
                    this.current = 3
                    return this.$msgs(res.msg)
            }
        },
       
    }
</script>

<style lang="scss" scoped>
    .main {
        width: 30%;
        height: 30%;
        position: absolute;
        top: 30%;
        left: 30%;
    }
</style>