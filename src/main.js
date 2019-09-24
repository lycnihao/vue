// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(ElementUI)

/* Vue.http.options.emulateJSON = true; */
/* Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.crossOrigin = true */
Vue.http.interceptors.push(function(request, next) {/* 跨域携带cookie */ request.credentials = true; next() }) 

// vue router
router.beforeEach((to, from, next) => {
	var _hmt = _hmt || [];
	window._hmt = _hmt;
	
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?b14e8cb38dafe28ede1af1dfd1f498dc";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
	
    // _hmt.push(['_trackPageview', pageURL]) 必须是以"/"（斜杠）开头的相对路径
    if (to.path) window._hmt.push(['_trackPageview', '/#' + to.fullPath])
    next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

