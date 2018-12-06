/*
* @Author: Tinphic
* @Date:   2018-08-27 17:08:17
* @Last Modified by:   Tinphic
* @Last Modified time: 2018-11-09 16:02:15
*/
let home = () => import ('@/pages/home/index');
let test = () => import ('@/pages/test/index');
const config = {
	routes: [
		{
			path: '/',
			name: "home",
			meta: {
	            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
	        },
			component: home
		},
		{
			path: '/test',
			name: "test",
			meta: {
	            requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的
	        },
			component: test
		},
	]
}


export default config