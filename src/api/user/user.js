import {get,post} from '@/plugins/utils/request.js'

export let login = LoginInfo => post('/account/login',LoginInfo);// 登录

export let getProfile = () => get('account/profile');// 获得安全数据

export let updateAccount= AccountInfo => post('account/updatePersonalInfo',AccountInfo); // 个人信息

export let validationAccountPwd = Pwd => post('account/validationAccountPwd',Pwd) //效验密码

export let updateAccountPwd = AccountPwd => post('account/forGetPwd/updatePwd',AccountPwd)// 修改账号密码

export let queryEmailAcountByNumber = Name => post('account/forGetPwd/queryEmailByAccountNumber',Name)// 账号查邮箱

export let sendEmail= Email => post('account/forGetPwd/sendVerificationCode',Email)// 发送邮箱

export let validation= EmailPwd => post('account/forGetPwd/validationCode',EmailPwd)// 效验验证码
