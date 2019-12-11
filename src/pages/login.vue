<template>
	<div class="source">
		<div class="block">
			<div class="form">
				<h1 class="title">登陆</h1>
				<el-form :model="logForm" ref="logForm" :rules="rules" status-icon>
					<el-form-item prop="username">
						<el-input v-model="logForm.username" placeholder="输入您的用户名或邮箱地址"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input v-model="logForm.password" placeholder="输入您的密码" show-password></el-input>
					</el-form-item>
				</el-form>
				
				<el-button type="primary" style="width: 100%;" @click="login()">登录</el-button>
				<el-divider content-position="center">社交帐号登录</el-divider>
				<div style="text-align: center;">
					<a href="oauth/qq" class="login_icon">
						<svg width="36" height="36" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg" class="icon" aria-hidden="true" style="fill: rgb(80, 200, 253); height: 36px; width: 36px;"><title></title><g><title>QQ</title><path d="M9.003 0c-2.265 0-6.29 1.364-6.29 7.325V8.52S.55 12.96.55 15.474c0 .665.17 1.025.28 1.025.115 0 .903-.485 1.75-2.073 0 0-.18 2.197 1.903 3.967 0 0-1.77.495-1.77 1.182 0 .686 4.078.43 6.29 0 2.24.425 6.287.687 6.287 0 0-.688-1.768-1.182-1.768-1.182 2.085-1.77 1.905-3.967 1.905-3.967.845 1.588 1.634 2.072 1.746 2.072.11 0 .283-.36.283-1.026 0-2.514-2.166-6.954-2.166-6.954V7.325C15.29 1.365 11.268 0 9.003 0z" fill-rule="evenodd"></path></g></svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			logForm:{
				username:'',
				password:'',
			},
			rules: {
				username: [{ required: true, message: '请输入登陆用户名', trigger: 'blur' },{ min: 3, max: 16, message: '长度在 3 到 12 个字符', trigger: 'blur' }],
				password: [{ required: true, message: '请输入登陆密码', trigger: 'blur' },{ min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }],
			},
		}
	},
	methods:{
		login:function(){
			let data = new FormData();
			data.append('username',this.logForm.username);
			data.append('password',this.logForm.password);
			this.$refs.logForm.validate((valid) => {
				if (valid) {
					this.$ajax.post('/hom1/api/user/login',data)
					.then((response)=>{
					    if(response.data.code == 1){
							this.$message({message: '登录成功',type: 'success'});
							var d= new Date();
							d.setHours(d.getHours() + (24 * 30)); //保存一个月
							document.cookie="request_token="+response.data.result+"; expires=" + d.toGMTString();
							window.location.href="/";
						} else{
							this.$message.error(response.data.msg);
						}
					}).catch((response)=>{
					    this.$message.error('发送请求失败，请检查网络是否通畅');
					});
				}else{
					console.log('error submit!!');
					return false;
				}
			});
		},
	}
}
</script>

<style>
@import '../assets/css/log_reg.css';
</style>
