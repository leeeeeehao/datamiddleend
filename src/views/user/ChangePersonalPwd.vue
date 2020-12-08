<template>
    <div id="main">
        <a-form ref="formRef" 
            :model="createForm" 
            :rules="createFormRules" 
            :label-col="labelCol" 
            :wrapper-col="wrapperCol">
				<a-form-item label="现有密码" name="xypwd">
					<a-input type="password" v-model="createForm.xypwd"></a-input>
				</a-form-item>
				<a-form-item label="新密码" name="pwd">
					<a-input type="password" v-model="createForm.pwd"></a-input>
				</a-form-item>
				<a-form-item label="确定密码" name="repeatPassword">
					<a-input type="password" v-model="createForm.repeatPassword"></a-input>
				</a-form-item>

                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" @click="updatePwd">立即修改</a-button>
                    &nbsp;&nbsp;&nbsp;
                    <router-link to="/home">
                        <a-button type="info">返回首页</a-button>
                    </router-link>
                </a-form-item>
		</a-form>
    </div>
</template>

<script>
import {getProfile,validationAccountPwd,updateAccountPwd} from '@/api/user/user.js'

export default {
    data(){
        return{
            labelCol: { span: 4 },
            wrapperCol: { span: 5 },
            accountList:[],
            createForm:{
                xypwd:'',
                pwd:'',
                repeatPassword:''
            },
            createFormRules:[]
        }
    },
    created(){
        this.getAccountInfo()
    },
    methods:{
        async getAccountInfo() {
			let res = await getProfile();
			if (res.status !== true) return this.$msge(res.msg)
            this.accountList = res.data
        },
        async updatePwd(){
            let res = await updateAccountPwd({
                "accountId":this.accountList.accountId,
				"accountPwd":this.createForm.pwd
            });
            if(res.status !== true) return this.$msge('修改失败!')
			window.sessionStorage.clear()
			this.$router.push('/login')
			return this.$msgs('修改成功!')
        }
    }
}
</script>

<style>
.main{
    width: 30%;
}
</style>