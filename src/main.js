// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routes from './routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$ajax= axios
axios.defaults.withCredentials=true
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// vue router
/* routes.beforeEach((to, from, next) => {
	var _hmt = _hmt || [];
	window._hmt = _hmt;

    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?b14e8cb38dafe28ede1af1dfd1f498dc";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);

    // _hmt.push(['_trackPageview', pageURL]) 必须是以"/"（斜杠）开头的相对路径
    if (to.path) window._hmt.push(['_trackPageview', '/#' + to.fullPath])
    next()
}) */

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return matchingView
        ? require('./layouts/' + matchingView + '.vue').default
        : require('./pages/404.vue')
    }
  },
  /* render: (createElement) => createElement(this.ViewComponent) */
  render (h) {
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
