import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import About from '@/components/about'
import Cooperation from '@/components/cooperation'

Vue.use(Router)

export default new Router({
        mode:
        'history',
        routes: [{
            path: '',
            name: 'Home',
			component: Home
        },
        {
            path: '/about',
            component: About
        },
        {
            path: '/cooperation',
            component: Cooperation
        }

        ]
    })
