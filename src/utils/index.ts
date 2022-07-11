import {h} from "vue";
import {NIcon} from "naive-ui";
import {Component} from "@vue/runtime-core";
import {BookOutline as BookIcon} from "@vicons/ionicons5";
import router from "@/router";

// 定义图标的方法
export const renderIcon =  (icon:Component) : Component =>{
	return () => h(NIcon, null, { default: () => h(icon) })
}
/**
 * 递归组装菜单格式
 */
export function generatorMenu(routerMap: Array<any>) {
	// 将侧边栏排序
	routerMap.sort((a, b) => a.meta.sort - b.meta.sort);
	// 处理数据结构 将接收到的参数循环遍历
	let result = routerMap.map((item) => {
		// 定义新的结构
		let menu = {
			label: item?.meta?.title,
			key: item?.name,
			icon: item.meta?.icon,
		}
		// 使用递归的方式处理侧边栏中的子路由
		if (item.children && item.children.length > 1){
			menu.children = generatorMenu(item.children)
		}
		// console.log(menu)
		return menu
	})
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