<template>
	<div class="source">
		<div class="block">
			<div class="register_avatar">
				<img src="http://thirdqq.qlogo.cn/g?b=oidb&k=XPia8AZb9AuBf9N64QEtwkw&s=100&t=1567745736"/>
			</div>
			<div class="form">
				<h1 class="register_name">{{regForm.username}}</h1>
				<el-form :model="regForm" ref="regForm" :rules="rules" status-icon>
					<el-form-item prop="username">
						<el-input v-model="regForm.username" placeholder="请输入您的昵称"></el-input>
					</el-form-item>
					<el-button type="primary" style="width: 100%;" @click="active">确认使用该昵称</el-button>
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
	},
	methods:{
		getInfo:function(){
		  let name = "request_token";
		  var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		  if(arr != null){
			  this.token = arr[2];
			  this.$ajax.defaults.headers.common['request_token'] = arr[2];
			  this.$ajax.get('/hom1/api/user/info')
			  .then((response)=>{
					this.regForm.username = response.data.msg;
			  });
		  }
		},
		active:function(){
		  let name = "request_token";
		  var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		  if(arr != null){
			  this.token = arr[2];
			  this.$ajax.defaults.headers.common['request_token'] = arr[2];
			  this.$ajax.get('/hom1/api/user/active?userName=' + this.regForm.username)
			  .then((response)=>{
				 if(response.data.code == 1){
					 console.log(response.data)
					 document.location.href = "/"
				 }
			  });
		  }
		},
	},mounted() {
		this.getInfo();
	}
}
</script>

<style>
	@import '../assets/css/log_reg.css';
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

	.register_name{
		height: 60px;
	}
	
</style>
