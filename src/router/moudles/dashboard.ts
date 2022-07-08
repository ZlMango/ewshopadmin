// 单独存放商品详情页的路由

// 引入组件
import Layout from '@/layout/index.vue';

// 从 vue-router 中引入数据结构
import {RouteRecordRaw} from 'vue-router'

// 将路由的名称单独定义 因为需多次调用
const routeName = 'dashboard'
/*
	@param name  路由名称 必须设置 且不能重名
	@param meta  路由元数据(路由附带扩展信息)
	@param redirect  重定向地址 访问这个路由时 自动进行重定向
	@param meta.disabled  禁用整个菜单
	@param meta.title  菜单名称
	@param meta.icon  菜单图标
	@param meta.keepAlive  缓存该路由
	@param meta.sort  排序越小越排前
*/
// 定义路由   限制该路由的数据类型为数组  限制该数组中的数据类型为泛型
const routes:Array<RouteRecordRaw> = [
	{
		// 定义路由
		path:'/dashboard',
		// 定义路由的名称
		name: routeName,
		// 注册组件
		component:Layout,
		// 拼接子路由
		redirect:'/dashboard/console',
		// 定义路由的元数据
		meta:{
			// 定义路由的标题
			title: 'Dashboard',
			// 定义路由的小图标
			icon:'dashboard'
		},
		// 定义子路由
		// children 中的所有的路由都会继承上级路由
		children:[
			{
				path: 'console',
				name:`${routeName}_console`,
				meta:{
					title:"主控台",
					icon:'console'
				},
				// 懒加载引入注册组件
				component: () => import('@/views/dashboard/index.vue')
			}
		]
	}
]
// 抛出路由
export default routes