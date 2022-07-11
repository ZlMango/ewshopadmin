// 从 vue-router 路由中导入 创建路由对象的方法和创建路由模式的方法
import {createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'
// 导入创建的组件
import Home from '@/views/Home.vue'
import Login from '@/views/login/index.vue'

// 批量导入所有路由文件
const modules = import.meta.globEager('./modules/**/*.ts')
// 创建新路由 将所有路由合并  定义RouteRecordRaw类型校验  允许在基础路由里面增加开发者自定义属性。
const routeModuleList : RouteRecordRaw[] = [];
// 遍历路由
Object.keys(modules).forEach((key)=>{
	const mod = modules[key].default || {};
	const modList = Array.isArray(mod) ? [...mod] : [mod];
	routeModuleList.push(...modList);
})

// 创建路由
const routes = [
	// 定义路由   注册组件
	{
		path: '/',
		component: Home,
		meta:{
			title:"首页"
		}
	},
	{
		path: '/Login',
		name:'Login',
		component: Login,
		meta:{
			title:"登录"
		}
	},
]
// 将所有的路由和主路由一起结构赋值
const baseRouters = [...routes,...routeModuleList]

// 创建路由对象  并将路由器对象抛出
export const router = createRouter({
	// 使用 createWebHashHistory 路由模式  符合url地址规范, 不需要#, 使用起来比较美观
	history: createWebHistory(),
	// 使用新的路由器对象作为类型约束
	routes:baseRouters, // short for `routes: routes`
})

// 添加全局前置导航守卫
router.beforeEach((to,from,next) => {
	// console.log(to)
	// 更改页面标题
	document.title = (to?.meta?.title as string) || document.title
	// 判断当前页面是否为登录页
	if (to.name != 'Login') {
		// 如果当前页面不是登录页   判断 token 是否存在0
		if (!localStorage.getItem('token')){
			next({
				path: '/login',
				query:{
					redirect:to.fullPath
				}
			})
		}
	}
	next()
})

// 将合并后的路由抛出
export {routeModuleList}
// 将主路由抛出
// export default routes









