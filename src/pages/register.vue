<template>
	<div class="register_source">
		<div class="register_block">
			<div class="register_avatar">
				<img src="http://thirdqq.qlogo.cn/g?b=oidb&k=XPia8AZb9AuBf9N64QEtwkw&s=100&t=1567745736"/>
			</div>
			<div class="register_form">
				<h1 class="register_name">{{regForm.username}}</h1>
				<el-form :model="regForm" ref="regForm" :rules="rules" status-icon>
					<el-form-item prop="username">
						<el-input v-model="regForm.username" placeholder="请输入您的昵称"></el-input>
					</el-form-item>
					<el-button type="primary" style="width: 100%;" >确认使用该昵称</el-button>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			regForm:{
				username:''	
			},
			rules: {
				username: [{ required: true, message: '请输入您的昵称', trigger: 'blur' },{ min: 3, max: 16, message: '长度在 3 到 12 个字符', trigger: 'blur' }],
			}
		}
	}
}
</script>

<style>
	.register_source{
		text-align: center;
	}
	.register_block{
		width: 450px;
		border-radius: 3px;
		margin: 200px auto 0;
		background-color: #fff;
		border: 1px solid #ebebeb;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
	}
	.register_avatar{
		display: block;
		width: 100px;
		height: 100px;
		margin: 50px auto 0;
	}
	
	.register_avatar > img{
		width: 100%;
		border-radius: 50px;
	}
	.register_form{
		margin: 20px 30px 50px;
	}
	
	.register_name{
		height: 60px;
	}
	
</style>
