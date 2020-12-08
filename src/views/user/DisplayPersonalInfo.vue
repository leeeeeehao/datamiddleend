<template>
    <div id="main">
        <ul>
				<li>账号:{{accountList.accountNumber}}</li>
				<li>昵称:{{accountList.accountNickName}}</li>
				<li>邮箱:{{accountList.accountEmail}}</li>
				<li>手机号:{{accountList.accountPhone}}</li>
				<li>上次登录时间:{{accountList.accountLastLoginTime}}</li>
		</ul>

        <div>
            <a-button type="primary" @click="showModal">
                编辑
            </a-button>
            <a-modal
            ok-text="确认" 
            cancel-text="取消"
            v-model="visible"
            title="修改个人信息"
            @ok="handleOk">
                <div class="divForm">
                     <a-form 
                     :model="accountList"
                     :rules="createFormRules" 
                     ref="formRef" 
                     :label-col="labelCol" 
                     :wrapper-col="wrapperCol">

                        <a-form-item label="账号">
                            <a-tag color="green">
                                {{accountList.accountNumber}}
                            </a-tag>
                        </a-form-item>
                        <a-form-item required  label="昵称" name="accountNickName">
						<a-input type="text" v-model="accountList.accountNickName"></a-input>
                        </a-form-item>
                        <a-form-item required  label="邮箱" name="accountEmail">
                            <a-input type="text" v-model="accountList.accountEmail"></a-input>
                        </a-form-item>
                        <a-form-item required  label="手机号" name="accountPhone">
                            <a-input type="text" v-model="accountList.accountPhone"></a-input>
                        </a-form-item>
                    </a-form>
                </div>
            </a-modal>
        </div>

    </div>
</template>

<script>
import {getProfile} from '@/api/user/user.js'
import {updateAccount} from '@/api/user/user.js'

export default {
    data(){
        // 验证手机号的规则
			var checkMobile = (rule, value, cb) => {
				// 验证手机号的正则表达式
				const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

				if (regMobile.test(value)) {
					return cb()
				}
				cb(new Error('请输入正确的手机号'))
			}

			// 验证邮箱的规则
			var checkEmail = (rule, value, cb) => {
				// 验证邮箱的正则表达式
				const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

				if (regEmail.test(value)) {
					// 合法的邮箱
					return cb()
				}

				cb(new Error('请输入正确的邮箱'))
			}

        return{
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            accountList:[],
            visible: false,
            createFormRules: {
					accountNickName: [{
						required: true,
						message: '请输入昵称',
						trigger: 'change'
					}],
					accountEmail: [{
						required: true,
						message: '请输入邮箱',
						trigger: 'change'
					}, {
						validator: checkEmail,
						trigger: 'change'
					}],
					accountPhone: [{
						required: true,
						message: '请输入手机号',
						trigger: 'change'
					}, {
						validator: checkMobile,
						trigger: 'change'
					}]
				}
        }
    },
    created() {
      this.getAccountInfo()
	},
    methods:{
        showModal() {
            this.visible = true;
        },
        async handleOk(e) {
            let res = await updateAccount({
                "accountId":this.accountList.accountId,
				"accountNickName":this.accountList.accountNickName,
				"accountEmail":this.accountList.accountEmail,
				"accountPhone":this.accountList.accountPhone
            });
            if (res.status !== true) return this.$msge(res.msg)
            this.visible = false;
            this.getAccountInfo()
            return this.$msgs('修改成功!')
            
        },
        async getAccountInfo() {
			let res = await getProfile();
			if (res.status !== true) return this.$msge(res.msg)
            this.accountList = res.data
		}
    }
}
</script>

<style lang="scss" scoped>
.divForm{
    widows: 100%;
}
</style>