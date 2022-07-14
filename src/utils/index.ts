import {h} from "vue";
import {NIcon} from "naive-ui";
import {Component} from "@vue/runtime-core";
import {BookOutline as BookIcon} from "@vicons/ionicons5";
import router from "@/router";

// 定义使用图标的方法
export const renderIcon =  (icon:Component) : Component =>{
	return () => h(NIcon, null, { default: () => h(icon) })
}
/**
 * 递归组装菜单格式
 */
export function generatorMenu(routerMap: Array<any>) {
	// 将侧边栏排序
	routerMap.sort((a, b) => a.meta.sort - b.meta.sort);
	// 定义用户权限
	// let permissions = ['users','goods','dashboard','slide']
	// 处理数据结构 将接收到的参数循环遍历
	let result = routerMap.map((item) => {
		// if (!permissions.includes(item.name)){
		// 	return  null
		// }
		// 定义新的结构
		let menu = {
			label: item?.meta?.title,
			key: item?.name,
			icon: item.meta?.icon,
		}
		// 使用递归的方式处理侧边栏中的子路由
		if (item.children && item.children.length > 1){
			menu.children = generatorMenu(item.children)
		}else if (item.children && item.children.length == 1){
			menu.key = item?.children[0].name
		}
		// console.log(menu)
		return menu
	})
	// 去除 result null
	// return result.filter(item => item != null)
	return result
/**
 * 判断根路由 Router
 * */
function isRootRouter(item):Boolean {
	return  item.children?.length === 1;
}}
// /**
//  * 排除Router
//  * */
// export function filterRouter(routerMap: Array<any>) {
//     return routerMap.filter((item) => {
//         return (
//             (item.meta?.hidden || false) != true &&
//             !['/:path(.*)*', '/', PageEnum.REDIRECT, PageEnum.BASE_LOGIN].includes(item.path)
//         );
//     });
// }