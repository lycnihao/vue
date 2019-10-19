<template>
	<div>
		<v-header></v-header>

		<section>
			<div id="search">

				<svg class="bg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
					<defs>
						<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
					</defs>
					<g class="parallax">
						<use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"></use>
						<use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"></use>
						<use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"></use>
						<use xlink:href="#gentle-wave" x="48" y="7" fill="#fff"></use>
					</g>

				</svg>
				<h3>以高效的方式获取想要的资源</h3>
				<div class="search-tools" style="height: 40px; line-height: 40px;">
					<ul class="nav menu-inline" style="line-height: 30px;">
						<li class="nav-item"><a href="javascript::void(0)" class="active">搜索引擎</a></li>
						<li class="nav-item"><a href="javascript::void(0)">站点搜索</a></li>
						<li class="nav-item"><a href="javascript::void(0)">文章搜索</a></li>
						<li class="nav-item"><a href="javascript::void(0)">图片</a></li>
						<li class="nav-item"><a href="javascript::void(0)">功能计划中</a></li>
					</ul>
				</div>
				<div class="search-center">
					<div class="dropdown">
						<el-dropdown placement="bottom" @command="handleCommand">
							<el-button type="text" class="el-dropdown-link">
								<img width="20px" height="20px" v-bind:src="searchIcon">
								<i class="el-icon-arrow-down"></i>
							</el-button>

							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="百度,https://www.baidu.com/s?word=,http://47.106.84.166:3302/upload/baidu.svg">
									<img width="20" alt="" src="http://47.106.84.166:3302/upload/baidu.svg">
									百度
								</el-dropdown-item>
								<el-dropdown-item command="360,https://www.so.com/s?q=,http://47.106.84.166:3302/upload/360.svg">
									<img width="20" alt="" src="http://47.106.84.166:3302/upload/360.svg">
									360
								</el-dropdown-item>
								<el-dropdown-item command="Bing,https://cn.bing.com/search?q=,http://47.106.84.166:3302/upload/bing.svg">
									<img width="20" alt="" src="http://47.106.84.166:3302/upload/bing.svg">
									Bing
								</el-dropdown-item>
								<el-dropdown-item command="搜狗,https://www.sogou.com/web?query=,http://47.106.84.166:3302/upload/sogou.svg">
									<img width="20" alt="" src="http://47.106.84.166:3302/upload/sogou.svg">
									搜狗
								</el-dropdown-item>
								<el-dropdown-item command="谷歌,https://www.google.com/search?q=,http://47.106.84.166:3302/upload/google.svg">
									<img width="20" alt="" src="http://47.106.84.166:3302/upload/google.svg">
									谷歌
								</el-dropdown-item>
							</el-dropdown-menu>

						</el-dropdown>
					</div>
					<input type="text" id="search_text" size="30" @keyup.enter="search" placeholder="输入关键字 搜你所想"/>
					<button id="search_but" @click="search" style="padding: 10px 25px;">{{searchTitle}}搜索</button>
				</div>

			</div>

			 <!-- 主体板块 -->
			 <div class="main" style="margin-top: 20px;">
        <!-- user-block图标板块 -->
        <div class="box user" :class="{edit:enabled}">
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
				<el-button type="primary" size="mini" @click="enabled = false" round v-else><i class="el-icon-success"></i>&nbsp;完成</el-button>
             </div>
          </div>
         <div class="box-body">
           <div id="user-block">
             <div class="tabs-content" style="width: 100%;">
              <div class="tabpanel show" name="常用链接">
                <el-row class="user-website" v-if="userSites.length != 0">
				  <draggable
					:list="userSites"
					:disabled="!enabled"
					class="list-group"
					ghost-class="ghost"
					animation=400
					chosenClass = ".site-item"
					@update="checkEdit">
					  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3" v-for="webSite in userSites">
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

				<el-row :gutter="10">
					<!-- 主体显示块 -->
					<el-col :md="18" :lg="18" :xl="18" class="container">
						<!-- 功能导航板块 -->
						 <div class="box">
							 <div style="width: 100%;display: inherit;border-bottom: 1px #F2F2F2 solid;">
								 <div class="float-left" style="margin-bottom: -5px;">
									 <ul class="nav menu-inline" style="line-height: 36px;">
										 <li class="nav-item"><a style="font-size: 15px;" href="#" class="active">导航</a></li>
										 <li class="nav-item"><a style="font-size: 15px;" href="#">新闻</a></li>
									</ul>
								 </div>
								 <div class="float-right"></div>
							 </div>
							 <div class="box-body" ref="menuWrapper1">
								 <ul class="menu menu-inline cate-list">
									 <li class="nav-item-radius" v-for="(category, index) in categorys">
										 <a @click="menuClick(index,$event)">
											<i :class="category.icon"></i>{{category.name}}
										 </a>
									 </li>
								 </ul>
							 </div>
						 </div>

						 <div v-show="menuTop" v-bind:class="['header-top-nav main', !headerNav ? 'hide' : '']">
						  <el-row :gutter="10">
							<!-- 主体显示块 -->
							<el-col :md="18" :lg="18" :xl="18" class="block">
							  <transition name="el-zoom-in-top" >
								 <ul v-show="headerNav" class="menu menu-inline cate-list" ref="menuWrapper2">
								 <li class="nav-item-radius" v-for="(category, index) in categorys">
								   <a @click="menuClick(index,$event)">
								  <i :class="category.icon"></i>{{category.name}}
								   </a>
								 </li>
								 </ul>
							  </transition>
							  <transition name="el-zoom-in-top">
								<div style="position: relative;">
									<span v-on:click="headerNav = !headerNav"  v-show="headerNav" style="position: absolute;left: -28px;top: -8px;">
									   <a href="javascript:(0);;" title="收起"><i class="el-icon-caret-top"></i></a>
									</span>
								</div>
							  </transition>
							  <transition name="el-zoom-in-top">
								<span v-on:click="headerNav = !headerNav" v-show="!headerNav">
								  <i class="el-icon-caret-bottom"></i>
								</span>
							  </transition>
							</el-col>
						  </el-row>
						 </div>

						<div id="wrapper" ref="sitesWrapper">
							<ul>
								<li v-for="category in categorys" class="box site-list-hook tabs">
								  <div class="box-header">
									 <div class="site-tabs">
										 <h3 :id="category.slugName">{{category.name}}</h3>
										 <div class="tabs-nav">
										 	<ul class="tablist">
										 		<li class="tabs-item" v-for="(subCategory,index) in subCategorys[category.categoryId]" @click="tabs(subCategory.slugName,$event)"><a :class="index == 0 ? 'active':''" href="javascript:void(0);">{{subCategory.name}}</a></li>
										 	</ul>
										 </div>
									 </div>
								  </div>
								   <div class="box-body">

										<div class="tabs-content" v-if="subCategorys[category.categoryId]">
											<div v-for="(subCategory,index) in subCategorys[category.categoryId]" :class="index == 0 ? 'tabpanel show':'tabpanel'" :name="subCategory.slugName">
												<ul class="site-list">
												  <li v-for="site in sites[subCategory.categoryId]">
													 <a class="site-item" :href="site.url" target='_blank' :title="site.summary">
													   <div class="site-icon">
														<img :data-src="site.icon" :alt="site.title"></img>
														</div>
													   <div class="site-info">
													   <h3>{{ site.title }}</h3>
													   <p>{{ site.summary }}</p>
													   </div>
													 </a>
												  </li>
												</ul>
											</div>
										</div>
										<div v-else>
											<ul class="site-list">
											  <li v-for="site in sites[category.categoryId]">
												 <a class="site-item" :href="site.url" target='_blank' :title="site.summary">
												   <div class="site-icon float-left">
													<el-image :src="site.icon" :alt="site.title">
													  <div slot="error" class="image-slot"><i class="el-icon-picture-outline"></i></div></el-image>
													</div>
												   <div class="site-info float-right">
												   <h3>{{ site.title }}</h3>
												   <p>{{ site.summary }}</p>
												   </div>
												 </a>
											  </li>
											</ul>
										</div>

								   </div>
								</li>
							</ul>
						</div>
<!-- 						<div class="box">
							<div class="box-header">
								<h3>精选图集</h3>
							</div>
							<div class="box-body">
								<ul class="accordion-container">
								  <li class="accordion-item" :style="{'background-image': 'url('+thumbnail.url+')'}" v-for="thumbnail in thumbnails">
									<a href="#"><p class="accordion-title">{{thumbnail.title}}</p></a>
								  </li>
								</ul>
							</div>
						</div> -->
					</el-col>
					<!-- 侧边栏 -->
					<el-col :md="6" :lg="6" :xl="6" class="sidebar">
						<!-- <div class="box">
						  <el-tabs class="tabs box-body" v-model="activeName" type="card">
							<el-tab-pane label="音乐" name="first">

							</el-tab-pane>
							<el-tab-pane label="预留" name="second">
								<el-carousel trigger="click" height="160px">
									<el-carousel-item v-for="item in imgs" :key="item">
										<img class="thumbnail" :src="item" width="100%" height="100%" />
									</el-carousel-item>
								</el-carousel>
							</el-tab-pane>
							<el-tab-pane label="预留" name="third">预留</el-tab-pane>
						  </el-tabs>
						</div> -->
						<div class="box calendar">
							<div class="box-body">
								<calendar></calendar>
							</div>
						</div>
						<div class="box hot-link">
							<div class="box-header">
								<h3><img :src="searchIcon">热搜榜</h3>
							<i @click="hotRefresh" class="el-icon-refresh"></i>
							</div>
							<div class="box-body">
								<el-carousel trigger="click" :autoplay="false" indicator-position="none" height= "350px">
									<el-carousel-item v-for="array in hotList">
							   <ul class="menu" style="width: 100%;">
								 <li class="nav-item" style="width: 100%;"  v-for="item in array">
								   <div style="display: flex;justify-content:space-between;">
									 <span style="display: inherit;">
									   <em>{{ item.index }}</em>
									   <a :href="item.url" @click="hotSearch">{{ item.title }}</a>
									 </span>
									 <span style="font-size: 13px;color: #999;">
										{{ item.level }}<i :class="item.trend == 'rise' ? 'rise el-icon-top':'fall el-icon-bottom'"></i>
									 </span>
								   </div>
								 </li>
							   </ul>


									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
						<!-- <div class="box link">
							<div class="box-header">
								<h3>今日推荐 * 精选</h3>
							</div>
							<div class="box-body">
								<a v-for="item in recommend" :href="item.url" target="_blank">
									<img :src="item.icon">
									{{ item.title }}-{{ item.summary }}
								</a>
							</div>
						</div> -->
					</el-col>
				</el-row>

			 </div>

			<el-backtop :bottom="100"></el-backtop>
		</section>

		<div class="links">
			 <div class="box">
				 <div class="box-header">
					 <h4><strong>友情链接</strong></h4>
				 </div>
				 <div class="box-body">
					<!-- <table width="100%" border="0" cellpadding="3" cellspacing="0">
						<tbody>
							<tr>
								<td><el-link href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=d05FTkBPTk5GRjcGBlkUGBo" target="_blank" type="info">申请友链</el-link></td>
							</tr>
						</tbody>
					</table> -->
					<table border="0" cellpadding="3" cellspacing="0">
						<tbody>
							<tr>
								<td style=" padding-right: 20px;"><el-link href="https://daohang.aizhancloud.cn/76" target="_blank" type="info">免费收录网站</el-link></td>
								<td><el-link href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=d05FTkBPTk5GRjcGBlkUGBo" target="_blank" type="info">申请友链</el-link></td>
							</tr>
						</tbody>
					</table>
				 </div>
			 </div>
		</div>

		<!-- <div id="sidebar" title="加载边栏" class="el-icon-discover"></div> -->
    <v-footer></v-footer>

    <el-dialog title="添加网址" :visible.sync="siteManage.add" :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true" @closed="siteManage.imageUrl=''">
		<el-form :model="addForm" ref="addForm" :rules="rules" status-icon>
			<el-form-item prop="url">
				<el-input v-model="addForm.url" placeholder="网站地址，如：http://www.baidu.com">
				  <template slot="append">抓取标题</template>
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
							  :action="apiUrl+'api/user/upload'"
							  :show-file-list="false"
							  :http-request="avatarUpload"
							  >
							  <img v-if="siteManage.imageUrl" :src="siteManage.imageUrl" class="avatar">
							  <el-tooltip v-else class="item" effect="dark" content="只能上传svg/ico/png/jpg/bmp/gif文件,且不超过500Kb" placement="top-start">
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

    <el-dialog title="修改网址" :visible.sync="siteManage.edit" :modal-append-to-body="false" :close-on-click-modal="false" :destroy-on-close="true" @closed	="siteManage.imageUrl=''">
    	<el-form :model="editForm" ref="editForm" :rules="rules" status-icon>
    		<el-form-item prop="url">
    			<el-input v-model="editForm.url" placeholder="网站地址，如：http://www.baidu.com">
    			  <template slot="append">抓取标题</template>
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
						  :action="apiUrl+'api/user/upload'"
						  :show-file-list="false"
						  :http-request="avatarUpload">
						  <img v-if="siteManage.imageUrl" :src="siteManage.imageUrl" class="avatar">
						  <el-tooltip v-else class="item" effect="dark" content="只能上传svg/ico/png/jpg/bmp/gif文件,且不超过500Kb" placement="top-start">
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
    <el-dialog title="分类管理" :visible.sync="siteManage.sort" :modal-append-to-body="false" :close-on-click-modal="false">
    	分类管理
    </el-dialog>
	</div>
</template>

<script>
import dataJson from './../data.json';
import header from './common/module/header'
import footer from './common/module/footer'
import calendar from './common/widget/calendar'
import BScroll from 'better-scroll'
import draggable from 'vuedraggable'

export
default {
        data() {
            return {
              listHeight: [],
              sitesScrollY: 0,
              activeIndex:'1',
              searchTitle: '百度',
              searchUrl: 'https://www.baidu.com/s?word=',
              searchIcon: 'http://47.106.84.166:3302/upload/baidu.svg',
              imgs: ['//icweiliimg9.pstatp.com/weili/l/189463222381969704.webp', '//icweiliimg1.pstatp.com/weili/l/199522817473249287.webp'],
              apiUrl: 'http://106.54.255.9:3302/',
              /* apiUrl: 'http://127.0.0.1:3302/', */
              categorys: [],
              subCategorys: {},
              activeSubCategorys: {},
              sites: null,
              userSites:[],
              touch: null,
              recommend: null,
              thumbnails: null,
              hotList: null,
              headerNav:true,
              menuTop:false,
              activeName: 'first',
              loading:true,
              siteManage:{
                add:false,
                edit:false,
                sort:false,
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
				  title:'168导航',
				  category:'0'
			  },
			  rules: {
			  	url: [{ required: true,type:"url", message: '请输入正确的网站链接URL', trigger: 'blur' }],
				title: [{ required: true, message: '请输入网站名称', trigger: 'blur' }],
			  }
            };
        },
        methods: {
          _initScroll() {
            new BScroll(this.$refs.menuWrapper1, { click: true });
            new BScroll(this.$refs.menuWrapper2, { click: true });
          },
          _calculateHeight() {
            let foodList = this.$refs.sitesWrapper.querySelectorAll(".site-list-hook");
            let user = document.querySelector(".user").scrollHeight;
            let search = document.getElementById("search");
            let height = 520 + user;
            this.listHeight  = []
            this.listHeight.push(height)
            for (let i = 0, l = foodList.length; i < l; i++) {
              let item = foodList[i]
              height += item.clientHeight + 10
              this.listHeight.push(height)
            }
          },
          menuClick(index, event) {
            if (!event._constructed) {
              return
            }
            /* console.log(this.listHeight[index]) */
            window.scrollTo({ top: this.listHeight[index], left: 0, behavior: 'smooth' })
          },
			userWebSite:function(command){
				if(!this.$children[0].isLogin){
					this.$children[0].loginOpen = true;
				}else{
					switch(command){
					   case 'add':
						this.siteManage.add = true
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
            search: function() {
                var url = this.searchUrl + document.getElementById("search_text").value;
                window.open(url, "_blank")
            },
            handleCommand: function(command) {
                var str = command.split(',');
                this.searchTitle = str[0];
                this.searchUrl = str[1];
                this.searchIcon = str[2];
            },
            getData: function() {
                //this.touch = dataJson.getTouch;
                //this.sites = dataJson.getList;
                //this.recommend = dataJson.getRecommend;
                const loading = this.$loading({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.2)'
                });
                this.thumbnails = dataJson.getThumbnail;

				this.getUserSites();

                this.$ajax.get(this.apiUrl + 'api/getHotList')
                .then((response)=>{
                    this.hotList = response.data;
                }).catch((response)=>{
                this.$message.error('数据请求失败，请稍后再试');
                });

                this.$ajax.get(this.apiUrl + 'api/getList')
                .then((response)=>{
                  loading.close();
                            for(let categorie of response.data.categories){
                              if(categorie.parentId == 0){
                                this.categorys.push(categorie)
                              }else{
                                let value = this.subCategorys[categorie.parentId];
                                if(value == undefined)
                                  value = []
                                value.push(categorie)
                                this.subCategorys[categorie.parentId] = value;

                                //默认选择tab项
                                if(this.activeSubCategorys[categorie.parentId] == undefined)
                                  this.activeSubCategorys[categorie.parentId] = categorie.slugName

                              }
                            }
                            this.sites = response.data.webSites;
                  this.$nextTick(() => {
                    this._initScroll(); // 初始化scroll
                    this._calculateHeight(); // 初始化列表高度列表
                    var img=document.querySelectorAll("img[data-src]")
                    for(var i=0;i<img.length;i++){img[i].style.opacity="0"}
                    this.lazy();
                  })
                }).catch((response)=>{
                  loading.close();
                  this.$message.error('数据请求失败，请稍后再试');
                });
            },
            hotSearch: function(options) {
                /* console.log(options.target.innerText); */
                window.open(this.searchUrl + options.target.innerText);
            },
            hotRefresh: function() {
                this.$ajax.get(this.apiUrl + 'api/getHotList')
                .then((response)=>{
                    this.hotList = response.data;
                    this.$notify({
                        title: '刷新成功',
                        message: '热搜榜每2个小时更新一次~',
                        type: 'success',
                        position: 'bottom-right'
                    });
                });
            },
			handleScroll: function(){
				//变量t是滚动条滚动时，距离顶部的距离
				var t = document.documentElement.scrollTop||document.body.scrollTop;
				let user = document.querySelector(".user").scrollHeight;
				if ( t > 618 + user) {
					this.menuTop = true;
				} else{
					this.menuTop = false;
				}


				var img=document.querySelectorAll("img[data-src]")
				for(var i=0;i<img.length;i++){img[i].style.opacity="0"}
				//图片懒加载
				this.lazy();

			},
			tabs:function(name,event){
				event.path[2].querySelector(".tablist .active").className = "";
				event.target.className = "active";
				event.path[6].querySelector('.tabpanel.show').className = "tabpanel"; //隐藏旧tab
				event.path[6].querySelector(`.tabpanel[name='${name}']`).className += " show"; //显示新的tab

				this._calculateHeight();
			},
			lazy:function(){
				var viewHeight=document.documentElement.clientHeight
				var t=document.documentElement.scrollTop||document.body.scrollTop;
				var limg=document.querySelectorAll("img[data-src]")
					Array.prototype.forEach.call(limg,function(item,index){

					var rect
					if(item.getAttribute("data-src")==="")
					return

					rect=item.getBoundingClientRect()
					if(rect.bottom>=0&&rect.top<viewHeight){(function(){
						var img=new Image()
						img.src=item.getAttribute("data-src")
						item.src=img.src
						var j=0
						setInterval(function(){j+=0.2
						if(j<=1){item.style.opacity=j
						return}},100)
						item.removeAttribute('data-src')
					})()}
				})
			},
			getUserSites:function(){
				let name = "user_session";
				var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
				if(arr != null){
				  this.$ajax.defaults.headers.common['token'] = arr[2];
				}
				this.$ajax.get(this.apiUrl + 'api/userWebSite')
				.then((response)=>{
					this.userSites = response.data;
				}).catch((response)=>{
				  this.$message.error('数据请求失败，请稍后再试');
				});
			},
			checkEdit: function(e) {
				console.log(e)
				this.$notify({
					  title: '成功',
					  message: '排序已经自动保存~',
					  type: 'success'
				});
			},
			avatarUpload:function(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				/* if (!isJPG) {
				  this.$message.error('上传头像图片只能是 JPG 格式!');
				  return false
				} */
				/* if (!isLt2M) {
				  this.$message.error('上传头像图片大小不能超过 2MB!');
				  return false
				} */
				let data = new FormData();
				data.append('file',file.file);
				let name = "user_session";
				var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
				if(arr != null){
				  this.$ajax.defaults.headers.common['token'] = arr[2];
				}
				this.$ajax.post(this.apiUrl + '/api/user/upload',data)
				.then((response)=>{
				    if(response.data.code == 1){
						if(this.siteManage.add){
							this.addForm.icon = this.siteManage.imageUrl = this.apiUrl + response.data.result.filePath;
						}else{
							this.editForm.icon = this.siteManage.imageUrl = this.apiUrl + response.data.result.filePath;
						}

					} else{
						this.$message.error(response.data.msg);
					}
				}).catch((response)=>{
				    this.$message.error('发送请求失败，请检查网络是否通畅');
				});
			},
			saveSite:function(data){
				let name = "user_session";
				var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
				if(arr != null){
				  this.$ajax.defaults.headers.common['token'] = arr[2];
				}
				this.$ajax.post(this.apiUrl + '/api/user/saveSite',data)
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
				this.$ajax.post(this.apiUrl + '/api/userWebSite/'+siteId)
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
				let name = "user_session";
				var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
				if(arr != null){
				  this.$ajax.defaults.headers.common['token'] = arr[2];
				}
				this.$ajax.post(this.apiUrl + '/api/user/removeSite/'+siteId)
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
			}
      },
      components: {
          'v-header': header,
          'v-footer': footer,
		  'draggable':draggable,
    'calendar': calendar
      },
		created() {
			this.getData();
			window.addEventListener('scroll', this.handleScroll, true);
		}
    }
</script>

<style>
@import '../assets/css/home_content.css';
@import '../assets/css/home_sidebar.css';
</style>
