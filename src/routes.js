/* import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/layouts/home'
import About from '@/layouts/about'
import Milestone from '@/layouts/milestone'
import Link from '@/layouts/link'
import Hot from '@/layouts/hot'

Vue.use(Router)

export default new Router({
        mode:
        'history',
        routes: [{
            path: '/',
			name: 'home',
			component: Home
        },{
		    path: '/hot',
		    name: 'hot',
			component: Hot
		},{
            path: '/about',
            component: About
        },{
            path: '/milestone',
            component: Milestone
        },{
            path: '/link',
            component: Link
        },
		
		
        ]
    }) */

export default {
  '/': 'home',
  '/about': 'about',
  '/milestone': 'milestone',
  '/hot': 'hot',
  '/link': 'link',
  '/kuaidi': 'kuaidi',
}
