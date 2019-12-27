<template>
	<div class="box">
		<!-- user-block图标板块 -->
		<div class="user" :class="{edit:enabled}">
		   <div class="box-header">
		     <div class="site-tabs">
		       <div class="tabs-nav">
		        <ul class="tablist">
		          <li class="tabs-item"  @click="tabs(subCategory.slugName,$event)">
		            <a class="active" href="javascript:void(0);"><i class="badge" style="background-color: #00FFFF;"></i>我的常用网址</a>
		            </li>
		        </ul>
		       </div>
		     </div>
		     <div class="user-button">
		       <el-dropdown trigger="click" @command="userWebSite" v-if="!enabled">
		          <span class="el-dropdown-link">
		            <el-button size="mini" round><i class="el-icon-s-tools" style="margin-right: 3px;"></i>自定义</el-button>
		          </span>
		          <el-dropdown-menu slot="dropdown">
		            <el-dropdown-item icon="el-icon-circle-plus" command="add">添加网址</el-dropdown-item>
		            <el-dropdown-item icon="el-icon-edit" command="edit">编辑网址</el-dropdown-item>
		            <el-dropdown-item icon="el-icon-menu" command="sort" disabled>分类管理</el-dropdown-item>
		          </el-dropdown-menu>
		        </el-dropdown>
				<el-button type="primary" size="mini" icon="el-icon-success" @click="enabled = false" round v-else>完成</el-button>
		     </div>
		  </div>
		 <div class="box-body">
		   <div id="user-block">
		     <div class="tabs-content" style="width: 100%;">
		      <div class="tabpanel show" name="常用链接">
				<div class="groupBut" v-show="enabled">
					<ul class="nav menu-inline">
						<li class="nav-item"><el-button type="primary" size="small" icon="el-icon-plus" @click="siteManage.add = true">添加网址</el-button></li>
						<li class="nav-item"><el-button size="small" icon="el-icon-folder-add" disabled>创建分类</el-button></li>
						<li class="nav-item"><el-button size="small" icon="el-icon-upload2" @click="siteManage.import=true">导入</el-button></li>
						<li class="nav-item">
							<el-popconfirm title="确定导出吗？" @onConfirm="exportHtml()">
								<el-button slot="reference" size="small" icon="el-icon-download">导出</el-button>
							</el-popconfirm>
						</li>
						
					</ul>
					<ul class="nav menu-inline">
						<li class="nav-item"><el-checkbox label="全选" border size="small" disabled></el-checkbox></li>
						<li class="nav-item"><el-button size="small" icon="el-icon-right" disabled>移动到</el-button></li>
						<li class="nav-item"><el-button size="small" icon="el-icon-delete" disabled>回收站</el-button></li>
					</ul>
				</div>
				<el-alert v-show="enabled" title="拖动网址即可排序哦~" type="info" center show-icon></el-alert>
		        <el-row class="user-website" v-if="userSites.length != 0">
				  <draggable
					:list="userSites"
					:disabled="!enabled"
					class="list-group"
					ghost-class="ghost"
					animation=400
					chosenClass = ".site-item"
					@update="checkEdit">
					  <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="4" v-for="webSite in userSites" :key="webSite.id" :data_id="webSite.id">
						<a v-if="!enabled" class="site-item" :href="webSite.websiteUrl" target='_blank' :title="webSite.websiteTitle">
						  <div class="site-icon">
							<el-image :src="webSite.websiteIcon">
							  <div slot="error" class="image-slot">
								<i class="el-icon-picture-outline"></i>
							  </div>
							</el-image>
						  </div>
						  <div class="site-info">
							<h3>{{webSite.websiteTitle}}</h3>
						  </div>
						</a>
						<div class="site-item" @click="editOpen(webSite.id)" v-else>
							<div class="site-edit">
								<i class="el-icon-remove" @click.stop="removeSite(webSite.id)"></i>
							</div>
							<div class="site-icon">
								<el-image :src="webSite.websiteIcon">
								  <div slot="error" class="image-slot">
								  <i class="el-icon-picture-outline"></i>
								  </div>
								</el-image>
							</div>
							<div class="site-info">
								<h3>{{webSite.websiteTitle}}</h3>
							</div>
						</div>
					  </el-col>
				  </draggable>
		        </el-row>
		
		        <div class="null" v-else>
		          <svg data-v-2283cbac="" data-v-56bd2c68="" version="1.1" width="50" height="50" viewBox="0 0 1092 1024" class="svg-icon icon-null"><path data-v-2283cbac="" d="M219.348655 207.982242c0 6.81909 3.409545 12.501665 9.092119 15.91121 5.682575 3.409545 12.501665 3.409545 19.320755 0 5.682575-3.409545 9.09212-9.09212 9.09212-15.91121 0-10.228635-9.09212-19.320755-19.320755-19.320755-9.09212 0-18.18424 9.09212-18.184239 19.320755z m743.280799-27.27636c-14.774695 0-26.139845 12.501665-26.139845 27.27636 0 14.774695 11.36515 27.27636 26.139845 27.27636 14.774695 0 26.139845-12.501665 26.139844-27.27636 1.136515-15.91121-11.36515-27.27636-26.139844-27.27636z m0 46.597115c-11.36515 0-20.45727-9.09212-20.45727-20.45727s9.09212-20.45727 20.45727-20.45727c11.36515 1.136515 19.320755 9.09212 20.457269 20.45727 0 11.36515-9.09212 20.45727-20.457269 20.45727zM717.142217 784.195339c-11.36515-32.958935-21.593785-65.917869-32.958934-98.876804-15.91121-50.006659-32.958935-98.876804-50.006659-148.883463-3.409545-10.228635-12.501665-17.047725-22.7303-17.047725H444.378621v-1.136515c1.136515-1.136515-1.136515-2.27303-2.27303-3.409545-2.27303-1.136515-5.682575-1.136515-7.955605 1.136515-1.136515 1.136515-1.136515 2.27303-2.27303 2.27303H178.434115c-4.54606 0-9.09212-1.136515-12.501665 1.136515-7.955605 2.27303-12.501665 7.955605-15.911209 15.91121h1.136515c-15.91121 45.460599-30.685905 90.921199-45.4606 137.518313L72.738222 773.966704l-1.136515 2.27303c-2.27303 6.81909-4.54606 12.501665-3.409545 20.457269v196.617092c0 5.682575 0 15.91121 7.955605 22.7303 5.682575 5.682575 13.63818 5.682575 19.320754 5.682575 1.136515 0 1.136515 0 1.136515-1.136515H694.411918c4.54606 0 12.501665-1.136515 18.184239-5.682575 4.54606-4.54606 6.81909-10.228635 6.81909-18.18424V797.833518c-1.136515-4.54606-1.136515-7.955605-2.27303-13.638179z m-14.774694 18.184239v194.344062c0 4.54606-1.136515 5.682575-1.136515 5.682575l-1.136515 1.136515c-1.136515 1.136515-3.409545 1.136515-5.682575 1.136515H95.468521c-3.409545 0-7.955605 1.136515-9.092119-1.136515l-1.136515-1.136515c-2.27303-2.27303-2.27303-5.682575-2.27303-10.228635V796.697003h-10.228635l10.228635-1.136515c-1.136515-4.54606 1.136515-9.09212 2.27303-13.638179l1.136515-2.27303 32.958934-101.149834c15.91121-45.460599 30.685905-90.921199 45.460599-137.518313l-4.54606-2.27303 5.682575 1.136515c1.136515-2.27303 2.27303-4.54606 4.54606-4.54606h247.760267c-4.54606 4.54606-9.09212 9.09212-13.63818 14.774695-2.27303 2.27303-2.27303 4.54606 0 7.955605 2.27303 2.27303 4.54606 2.27303 7.955605 0 7.955605-6.81909 13.63818-14.774695 19.320754-21.593785h180.705883c2.27303 0 5.682575 2.27303 5.682575 4.54606l50.006659 148.883463c11.36515 32.958935 21.593785 65.917869 32.958935 98.876803 1.136515 2.27303 1.136515 5.682575 1.136515 9.09212v4.54606zM678.500708 785.331853H493.248766c-5.682575 0-12.501665 1.136515-18.18424 6.81909s-5.682575 14.774695-6.81909 18.18424c-1.136515 17.047725-7.955605 32.958935-18.18424 46.597114-12.501665 14.774695-31.82242 25.00333-52.279689 25.00333-15.91121 1.136515-32.958935-4.54606-46.597114-14.774695-18.18424-12.501665-29.54939-34.09545-30.685905-55.689234-1.136515-4.54606-1.136515-14.774695-7.955605-20.45727-5.682575-4.54606-12.501665-5.682575-18.18424-5.682575H109.106701c-4.54606 0-9.09212 4.54606-9.09212 9.09212s4.54606 9.09212 9.09212 9.09212h184.115427c3.409545 1.136515 5.682575 1.136515 5.682575 1.136515l1.136515 1.136515c1.136515 1.136515 2.27303 5.682575 2.27303 9.09212 1.136515 27.27636 14.774695 53.416204 37.504995 69.327414 15.91121 11.36515 34.09545 18.18424 53.416204 18.18424 2.27303 0 3.409545-1.136515 5.682575-1.136515 25.00333-1.136515 47.733629-12.501665 63.644839-30.685905 14.774695-15.91121 21.593785-36.368479 22.7303-56.825749 1.136515-1.136515 1.136515-5.682575 2.27303-6.81909l1.136515-1.136515c1.136515-1.136515 2.27303-1.136515 5.682575-1.136515h184.115427c4.54606 0 9.09212-4.54606 9.09212-9.09212 0-5.682575-4.54606-10.228635-9.09212-10.228635z m354.592675-355.729189s-13.63818 45.460599-39.778025 52.279689c0 0 32.958935 13.63818 39.778025 47.733629 0 0 4.54606-48.870144 44.324084-50.006659 0-1.136515-42.051054-22.7303-44.324084-50.006659z m-783.058824-352.319645s4.54606-37.504994 32.958935-38.64151c0 1.136515-32.958935-17.047725-32.958935-38.641509 0 0-10.228635 35.231964-31.822419 39.778024 1.136515 1.136515 27.27636 11.36515 31.822419 37.504995z m825.109878 277.309656s-4.54606 17.047725-14.774695 19.320755c0 0 12.501665 4.54606 14.774695 18.184239 0 0 2.27303-18.18424 15.91121-18.184239 1.136515-1.136515-14.774695-9.09212-15.91121-19.320755z m-571.667037 113.651498c12.501665-5.682575 25.00333-15.91121 36.36848-26.139844 1.136515-1.136515 2.27303-3.409545 2.27303-4.54606-1.136515-2.27303-2.27303-3.409545-3.409545-4.54606-1.136515 0-3.409545 1.136515-4.54606 1.136515-11.36515 10.228635-22.7303 18.18424-35.231965 25.003329-2.27303 1.136515-3.409545 4.54606-2.273029 6.81909 2.27303 2.27303 4.54606 3.409545 6.819089 2.27303z m-152.293007-55.689234c2.27303-1.136515 4.54606-3.409545 4.54606-5.682575-1.136515-4.54606-1.136515-7.955605-1.136515-12.501665l4.54606-15.91121c2.27303-4.54606 4.54606-7.955605 7.955604-11.365149 2.27303-2.27303 2.27303-4.54606 0-7.955605-2.27303-2.27303-4.54606-2.27303-7.955604 0-12.501665 13.63818-18.18424 30.685905-14.774695 48.870144 1.136515 3.409545 4.54606 5.682575 6.81909 4.54606z m209.118757 10.228635c9.09212-9.09212 18.18424-20.45727 26.139844-31.82242 1.136515-1.136515 1.136515-2.27303 1.136515-3.409545-1.136515-2.27303-1.136515-2.27303-2.27303-3.409545-1.136515-1.136515-2.27303-1.136515-3.409545-1.136515-1.136515 1.136515-2.27303 1.136515-3.409545 2.27303-9.09212 11.36515-17.047725 21.593785-26.139844 31.82242-2.27303 2.27303-2.27303 4.54606 1.136515 7.955605 2.27303 0 4.54606 0 6.81909-2.27303z m-177.296338-68.190899c1.136515 0 1.136515 0 2.27303-1.136515 12.501665-5.682575 28.412875-7.955605 42.051055-4.54606 2.27303 1.136515 5.682575-1.136515 5.682574-3.409545 1.136515-2.27303-1.136515-5.682575-3.409544-5.682575-14.774695-4.54606-32.958935-2.27303-48.870145 4.54606-2.27303 1.136515-3.409545 3.409545-2.27303 5.682575 0 2.27303 2.27303 4.54606 4.54606 4.54606z m81.829079 51.143174c0 2.27303 1.136515 3.409545 2.27303 4.54606 2.27303 1.136515 3.409545 1.136515 4.54606-1.136515 1.136515-1.136515 2.27303-2.27303 2.27303-4.54606-2.27303-22.7303-11.36515-39.778024-23.866815-52.279689-2.27303-2.27303-5.682575-1.136515-7.955605 1.136515-2.27303 2.27303-2.27303 4.54606 1.136515 7.955605 12.501665 9.09212 19.320755 23.866815 21.593785 44.324084z m-64.781354 59.098779c-1.136515 2.27303-1.136515 5.682575 2.27303 6.81909 11.36515 5.682575 21.593785 9.09212 32.958934 11.36515h1.136515c2.27303 0 4.54606-2.27303 4.54606-4.54606 1.136515-2.27303-2.27303-4.54606-4.54606-5.682575-10.228635-1.136515-19.320755-4.54606-29.549389-9.09212-2.27303-2.27303-4.54606-1.136515-6.81909 1.136515z m75.009989-34.095449c-1.136515-1.136515-2.27303-2.27303-3.409545-2.27303-2.27303-1.136515-5.682575 2.27303-5.682575 4.54606-1.136515 13.63818-4.54606 26.139845-7.955605 38.641509-2.27303 0-4.54606 1.136515-5.682575 1.136515-2.27303 0-4.54606 2.27303-4.54606 4.54606s2.27303 4.54606 4.54606 4.54606h2.27303c-2.27303 4.54606-4.54606 9.09212-6.81909 14.774695-1.136515 2.27303-1.136515 5.682575 2.27303 6.81909 2.27303 1.136515 5.682575 1.136515 6.81909-2.27303 3.409545-5.682575 5.682575-12.501665 9.09212-19.320755 4.54606-1.136515 9.09212-1.136515 12.501665-2.27303 2.27303-1.136515 4.54606-3.409545 3.409545-5.682575-1.136515-2.27303-3.409545-4.54606-5.682575-3.409545-2.27303 1.136515-4.54606 1.136515-5.682575 1.136515 3.409545-11.36515 5.682575-23.866815 7.955605-36.368479-2.27303-2.27303-3.409545-3.409545-3.409545-4.54606z m-118.197558-6.81909c-2.27303 1.136515-2.27303 4.54606-1.136515 7.955605 5.682575 7.955605 12.501665 15.91121 21.593784 22.730299l9.09212 7.955605c2.27303 2.27303 5.682575 1.136515 7.955605-1.136515 2.27303-2.27303 1.136515-5.682575-1.136515-7.955605-3.409545-2.27303-5.682575-4.54606-9.09212-7.955605-7.955605-6.81909-14.774695-13.63818-19.320755-21.593784-2.27303-1.136515-5.682575-1.136515-7.955604 0z m279.582685-122.743618c2.27303 1.136515 5.682575 1.136515 6.81909-2.27303 11.36515-22.7303 18.18424-38.641509 18.18424-38.64151 1.136515-2.27303 1.136515-5.682575-2.27303-6.81909-1.136515-1.136515-2.27303-1.136515-4.54606 0-1.136515 1.136515-2.27303 1.136515-2.27303 2.27303 0 0-5.682575 15.91121-18.184239 38.64151-1.136515 2.27303 0 5.682575 2.273029 6.81909z m-37.504994 68.190899c2.27303 0 3.409545-1.136515 4.54606-2.27303 9.09212-13.63818 18.18424-28.412875 26.139845-42.051055 1.136515-1.136515 1.136515-2.27303 1.136515-4.54606-1.136515-1.136515-1.136515-2.27303-2.27303-3.409545-1.136515-1.136515-2.27303-1.136515-4.54606-1.136515-1.136515 1.136515-2.27303 1.136515-3.409545 2.27303-7.955605 14.774695-15.91121 28.412875-25.00333 42.051055-1.136515 1.136515-1.136515 3.409545-1.136515 4.54606 1.136515 4.54606 3.409545 4.54606 4.54606 4.54606z m87.511654-106.832409l-5.682575 64.781354 36.368479-47.733629-30.685904-17.047725z m-118.197559-69.327414l85.238624 38.64151 138.654828-110.241954-105.695893 114.788014 105.695893 35.231964L851.250985 57.962264 568.258754 193.207547zM361.413028 598.943396c11.36515-7.955605 21.593785-14.774695 31.822419-22.730299 1.136515-1.136515 2.27303-2.27303 2.27303-4.54606-1.136515-2.27303-1.136515-3.409545-3.409545-4.54606-2.27303-1.136515-3.409545-1.136515-4.54606 1.136515-10.228635 7.955605-20.45727 15.91121-31.822419 22.730299-2.27303 1.136515-3.409545 4.54606-1.136515 7.955605 1.136515 0 4.54606 1.136515 6.81909 0z m-18.18424 9.09212l-4.54606-9.09212c-21.593785 12.501665-37.504994 18.18424-37.504995 18.18424l3.409545 9.09212c2.27303 0 17.047725-5.682575 38.64151-18.18424zM31.823682 286.401776s-10.228635 35.231964-31.822419 39.778024c0 0 26.139845 10.228635 31.822419 36.36848 0 0 4.54606-37.504994 32.958935-38.64151 1.136515 1.136515-31.82242-15.91121-32.958935-37.504994z m826.246393 353.45616s-4.54606 17.047725-14.774695 19.320754c0 0 12.501665 4.54606 14.774695 18.18424 0 0 2.27303-18.18424 15.91121-18.18424 0 0-15.91121-9.09212-15.91121-19.320754z m0 0" fill="#7DB6FF" stroke="transparent"></path></svg>
		        </div>
		
		      </div>
		     </div>
		   </div>
		
		 </div>
		</div>
		<el-dialog title="添加网址" :visible.sync="siteManage.add" :append-to-body="true" :close-on-click-modal="false" :destroy-on-close="true" @closed="siteManage.imageUrl=''">
			<el-form :model="addForm" ref="addForm" :rules="rules" status-icon>
				<el-form-item prop="url">
					<el-input v-model="addForm.url" placeholder="网站地址，如：http://www.baidu.com">
					  <template slot="append"><el-button @click="getContent(addForm.url)">抓取标题</el-button></template>
					</el-input>
				</el-form-item>
				<el-row :gutter="10">
				  <el-col :xs="14" :sm="16" :md="16" :lg="16" :xl="16">
					<el-form-item prop="title">
						<el-input v-model="addForm.title" placeholder="网站名称"></el-input>
					</el-form-item>
				  </el-col>
				  <el-col :xs="10" :sm="8" :md="8" :lg="8" :xl="8">
					<el-form-item prop="category">
						<el-select v-model="addForm.category" placeholder="请选择">
						  <el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						  </el-option>
						</el-select>
					</el-form-item>
				  </el-col>
				</el-row>
				<el-divider class="divider">
					<span>文字格式设置</span>
				</el-divider>
				<el-row :gutter="15" class="option">
					<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
						<div class="option-item">
						  <div class="item">
							  <el-upload
								  ref="upload"
								  :action="'/api/user/upload'"
								  :show-file-list="false"
								  :before-upload="beforeAvatarUpload"
								  :http-request="avatarUpload"
								  >
								  <img v-if="siteManage.imageUrl" :src="siteManage.imageUrl" class="avatar">
								  <el-tooltip v-else class="item" effect="dark" content="只能上传svg/ico/png/jpg/bmp/gif文件,且不超过2MB" placement="top-start">
									  <span><i slot="trigger" class="el-icon-camera-solid"></i></span>
									</el-tooltip>
								</el-upload>
						  </div>
						  <span class="title">图标</span>
						</div>
		 
					</el-col>
					<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
						<div class="option-item">
						  <div class="item">
							<el-color-picker size="small"></el-color-picker>
						  </div>
						  <span class="title">颜色</span>
						</div>
					</el-col>
				</el-row>
			</el-form>
			<el-button type="primary" style="width: 100%;" @click="addSite()">立即保存</el-button>
		</el-dialog>
		 
		<el-dialog title="修改网址" :visible.sync="siteManage.edit" :append-to-body="true" :close-on-click-modal="false" :destroy-on-close="true" @closed="siteManage.imageUrl=''">
		 	<el-form :model="editForm" ref="editForm" :rules="rules" status-icon>
		 		<el-form-item prop="url">
		 			<el-input v-model="editForm.url" placeholder="网站地址，如：http://www.baidu.com">
		 			  <template slot="append"><el-button @click="getContent(editForm.url)">抓取标题</el-button></template>
		 			</el-input>
		 		</el-form-item>
		 		<el-row :gutter="10">
		 		  <el-col :xs="14" :sm="16" :md="16" :lg="16" :xl="16">
		 			<el-form-item prop="title">
		 				<el-input v-model="editForm.title" placeholder="网站名称"></el-input>
		 			</el-form-item>
		 		  </el-col>
		 		  <el-col :xs="10" :sm="8" :md="8" :lg="8" :xl="8">
		 			<el-form-item prop="category">
		 				<el-select v-model="editForm.category" placeholder="请选择">
		 				  <el-option
		 					v-for="item in options"
		 					:key="item.value"
		 					:label="item.label"
		 					:value="item.value">
		 				  </el-option>
		 				</el-select>
		 			</el-form-item>
		 		  </el-col>
		 		</el-row>
		 		<el-divider class="divider">
		 			<span>文字格式设置</span>
		 		</el-divider>
		 		<el-row :gutter="15" class="option">
		 			<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
		 				<div class="option-item">
		 				  <div class="item">
		 					 <el-upload
		 					  ref="upload"
		 					  :action="'/api/user/upload'"
		 					  :show-file-list="false"
							  :before-upload="beforeAvatarUpload"
		 					  :http-request="avatarUpload">
		 					  <img v-if="siteManage.imageUrl" :src="siteManage.imageUrl" class="avatar">
		 					  <el-tooltip v-else class="item" effect="dark" content="只能上传svg/ico/png/jpg/bmp/gif文件,且不超过2MB" placement="top-start">
		 						  <span><i slot="trigger" class="el-icon-camera-solid"></i></span>
		 						</el-tooltip>
		 					</el-upload>
		 				  </div>
		 				  <span class="title">图标</span>
		 				</div>
		 
		 			</el-col>
		 			<el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
		 				<div class="option-item">
		 				  <div class="item">
		 				  	<el-color-picker size="small"></el-color-picker>
		 				  </div>
		 				  <span class="title">颜色</span>
		 				</div>
		 			</el-col>
		 		</el-row>
		 	</el-form>
		 	<el-button type="primary" style="width: 100%;" @click="editSite()">立即保存</el-button>
		</el-dialog>
		
		<el-dialog title="书签导入" :visible.sync="siteManage.import" :append-to-body="true" :close-on-click-modal="false" :destroy-on-close="true">
				<el-upload
				  style="text-align: center;"
				  drag
				  action="'/api/user/upload'"
				  :http-request="importHtml"
				  :beforeUpload="beforeImportHtml"
				  :limit="1">
				  <i class="el-icon-upload"></i>
				  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				  <div class="el-upload__tip" slot="tip">只能上传html文件。上传完成后需要一段时间解析，<b>请勿重复上传</b>。</div>
				</el-upload>
		</el-dialog>
		
		<el-dialog title="分类管理" :visible.sync="siteManage.sort" :append-to-body="true" :close-on-click-modal="false" :destroy-on-close="true">
		 	分类管理
		</el-dialog>
	</div>
</template>

<script>
import draggable from 'vuedraggable'

export
default {
	data() {
		return {
			userSites:[],
			 siteManage:{
				add:false,
				edit:false,
				sort:false,
				import:false,
				imageUrl:''
			},
			options: [{
				value: '0',
				label: '我的常用网址'
			}],
			enabled: false,
			addForm:{
			  url:'',
			  icon:'',
			  title:'',
			  category:'0'
			},
			editForm:{
			  id:'1',
			  icon:'',
			  url:'http://www.168dh.cn',
			  title:'酷达导航',
			  category:'0'
			},
			rules: {
				url: [{ required: true,type:"url", message: '请输入正确的网站链接URL', trigger: 'blur' }],
				title: [{ required: true, message: '请输入网站名称', trigger: 'blur' }],
			}
		}
	},
	methods:{
		exportHtml:function(){
			window.open('/couldr/api/user/export')
		},
		beforeImportHtml:function(file){
			const isJPG = file.type === 'text/html';
			if (!isJPG) {
				this.$message.error('只能是 html 格式!');
			}
			return isJPG;
		},
		importHtml:function(file) {
			let data = new FormData();
			data.append('file',file.file);
			this.$ajax.post('/couldr/api/user/import',data)
			this.$message({message: '提交成功！后台为您解析中请稍后查看',type: 'success'});
		},
		userWebSite:function(command){
			if(!this.$parent.$refs.header.isLogin){
				window.location.href = "/login"
			}else{
				console.log(command)
				switch(command){
				   case 'add':
					console.log("添加")
					this.enabled = this.siteManage.add = true
				   break;
				   case 'edit':
					/* this.siteManage.edit = true */
					this.enabled = true;
				   break;
				   case 'sort':
					this.siteManage.sort = true
				   break;
				}
			}
		},
		getUserSites:function(){
			let name = "request_token";
			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			if(arr != null){
			  this.$ajax.defaults.headers.common['request_token'] = arr[2];
			}
			this.$ajax.get('/couldr/api/userWebSite')
			.then((response)=>{
				this.userSites = response.data;
			}).catch((response)=>{
			  this.$message.error('数据请求失败，请稍后再试');
			});
		},
		checkEdit: function(e) {
			console.log("之前位置"+e.oldIndex)
			console.log("当前位置"+e.newIndex)
			let id = e.clone.attributes.data_id.value;
			
			let data = new FormData();
			data.append('oldIndex',e.oldIndex);
			data.append('newIndex',e.newIndex);
			
			this.$ajax.post('/couldr/api/user/sortSite/' + id,data)
			.then((response)=>{
				if(response.data.code == 1){
					this.$notify({
					  title: '成功',
					  message: '排序已经自动保存~',
					  type: 'success'
					});
				}
			});
			
		},
		
		beforeAvatarUpload:function(file) {
			const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/ico'
			 || file.type === 'image/gif' || file.type === 'image/svg' || file.type === 'image/bmp';
			const isLt2M = file.size / 1024 / 1024 < 2;
					
			if (!isImage) {
			  this.$message.error('上传头像图片只能是 svg/ico/png/jpg/bmp/gif 格式!');
			}
			if (!isLt2M) {
			  this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			
			return isImage && isLt2M;
		},
		avatarUpload:function(file) {
			let data = new FormData();
			data.append('file',file.file);
			this.$ajax.post('/couldr/api/user/icon/upload',data)
			.then((response)=>{
				if(response.data.code == 1){
					if(this.siteManage.add){
						this.addForm.icon = this.siteManage.imageUrl = response.data.result.filePath;
					}else{
						this.editForm.icon = this.siteManage.imageUrl = response.data.result.filePath;
					}
		
				} else{
					this.$message.error(response.data.msg);
				}
			}).catch((response)=>{
				this.$message.error('发送请求失败，请检查网络是否通畅');
			});
		},
		saveSite:function(data){
			this.$ajax.post('/couldr/api/user/saveSite',data)
			.then((response)=>{
				if(response.data.code == 1){
					this.$message({message: '保存成功！',type: 'success'});
					this.siteManage.add = false;
					this.siteManage.edit = false;
					this.getUserSites();
				} else{
					this.$message.error(response.data.msg);
				}
			}).catch((response)=>{
				this.$message.error('发送请求失败，请检查网络是否通畅');
			});
		},
		addSite:function(){
			let data = new FormData();
			data.append('websiteTitle',this.addForm.title);
			data.append('websiteUrl',this.addForm.url);
			data.append('websiteIcon',this.addForm.icon);
			data.append('websiteCate',this.addForm.category);
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.saveSite(data)
				}else{
					console.log('error submit!!');
					return false;
				}
			});
		},
		editOpen:function(siteId){
			this.siteManage.edit = true;
			this.editForm.id = siteId;
			this.$ajax.post('/couldr/api/userWebSite/'+siteId)
			.then((response)=>{
				if(response.data.code == 1){
					this.editForm.title = response.data.result.websiteTitle;
					this.editForm.icon = response.data.result.websiteIcon;
					this.editForm.category = response.data.result.websiteCate;
					this.siteManage.imageUrl = this.editForm.websiteIcon = response.data.result.websiteIcon;
				} else{
					this.$message.error(response.data.msg);
				}
			}).catch((response)=>{
				this.$message.error('发送请求失败，请检查网络是否通畅');
			});
		},
		editSite:function(){
			let data = new FormData();
			data.append('id',this.editForm.id);
			data.append('websiteTitle',this.editForm.title);
			data.append('websiteUrl',this.editForm.url);
			data.append('websiteIcon',this.editForm.icon);
			data.append('websiteCate',this.editForm.category);
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.saveSite(data)
				}else{
					console.log('error submit!!');
					return false;
				}
			});
		},
		removeSite:function(siteId){
			this.$ajax.post('/couldr/api/user/removeSite/'+siteId)
			.then((response)=>{
				if(response.data.code == 1){
					this.$message({message: '删除成功！',type: 'success'});
					this.getUserSites();
				} else{
					this.$message.error(response.data.msg);
				}
			}).catch((response)=>{
				this.$message.error('发送请求失败，请检查网络是否通畅');
			});
		},
		getContent:function(url){
			this.$ajax.get('/couldr/api/getWebContent?url=' + url)
			.then((response)=>{
				if(response.data.code == 1){
					if(this.siteManage.add){
						this.addForm.title = response.data.result.name
						this.addForm.icon = this.siteManage.imageUrl = response.data.result.iconFile
					}else{
						this.editForm.title = response.data.result.name
						this.editForm.icon = this.siteManage.imageUrl = response.data.result.iconFile
					}
				} else{
					this.$message.error(response.data.msg);
				}
			})
		}
	},
	components: {
	  'draggable':draggable,
	},
	created() {
		this.getUserSites()
	}
}
</script>

<style>
.user.edit {
	border: 1px #008eff solid;
}

.user .groupBut{
	margin: -16px 0 6px;
	display: flex; 
	justify-content:space-between;
}

.ghost>.site-item {
	opacity: 0.5;
	background: #c8ebfb;
	border: 3px #F35C01 dotted !important;
}

.borderNone {
	border: 0px;
}

.user.edit .list-group>div .site-item {
	cursor: move;
	margin: 5px;
	border: 3px #f1f1f1 dotted;
	position: relative;
}

.user.edit .site-item {
	border-radius: 0;
}

.user.edit .site-item:hover {
	box-shadow: none!important;
	transform: none !important;
}

.user.edit .site-item .site-edit {
	opacity: 0;
}

.user.edit .site-item:hover .site-edit {
	opacity: 1;
}

.user.edit .site-item .site-edit {
	cursor: pointer;
}

.user.edit .site-item .site-edit .el-icon-remove {
	position: absolute;
	top: -10px;
	right: -8px;
	color: #ff3d00;
	font-size: 18px;
	z-index: 50;
}


.option {
	margin-bottom: 15px;
}

.option > div {
	border-right: 1px solid #f5f5f5;
}

.option > div:last-child {
	border-right: none;
}

.option .option-item {
	text-align: center;
	display: inline-block;
	width: 100%;
	box-sizing: border-box;
}

.option .option-item .item {
	display: block;
	height: 32px;
	line-height: 32px;
	margin-bottom: 5px;
}

.option .option-item .item i {
	font-size: 32px;
	vertical-align: middle;
}

.option .option-item .title {
	color: #8492a6;
	font-size: 14px;
}

.divider {
	margin: 5px 0 15px 0;
}

.divider > div {
	background: #f9f9f9;
	border-radius: 10px;
}

.divider > div > span {
	color: #a1a7b7;
}

.avatar {
	width: 32px;
	height: 32px;
	border-radius: 6px;
}

#user-block {
	width: 100%;
	margin: 5px 0;
	border-radius: 2px;
}

.user .list-group>div {
	border: 2px transparent dotted;
}

.user-website {
	padding: 2px 12px;
}

.user-website .site-item {
	display: block;
	margin: 1px 5px;
	padding: 5px 15px;
	height: 32px;
	line-height: 32px;
	border-radius: 6px;
	transition: box-shadow 0.25s ease-out, transform 0.25s ease-out;
}

.user-website .site-item:hover {
	box-shadow: 5px 8px 10px rgba(36, 37, 38, 0.13);
	transform: translate(0%, -4px);
}

.user-website .site-item .site-icon {
	margin-right: 5px;
	float: left;
	height: inherit;
}

.user-website .site-item .site-icon img {
	width: 20px;
	height: 20px;
	border-radius: 20%;
	vertical-align: middle;
}

.user-website .site-info {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.user-website .site-info h3 {
	font-size: 14px;
}

.user .badge {
	padding: 3px;
	margin: 0 4px 2px 0;
	border-radius: 50%;
	display: inline-block;
}

.user .tabs-nav .active .badge {
	display: none;
}

.user .user-button {
	width: auto;
	text-align: right;
}

.user .user-button ul {
	display: flex;
}

.user .user-button ul li {
	margin: 0 3px;
}

#user-block .null {
	text-align: center;
}

@media only screen and (max-width: 479px) {
	.user-website {
		padding: 0;
	}

	.user-website>li {
		display: inline-flex;
		margin: 2px;
		width: 47%;
	}

	.user-website>li>a {
		height: 40px;
		padding: 5px 15px;
	}

	.user-website>li>a .site-icon {
		margin-right: 2px;
		position: relative;
	}

	.user-website>li>a .site-info h3 {
		font-size: 14px;
	}

	.user-website>li>a .site-info p {
		font-size: 11px;
	}

	.user-website>li>a .el-image {
		width: 30px;
		height: 30px;
	}
}
</style>
