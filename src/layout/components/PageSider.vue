<template>
		<div class="pt-4">
				<div class="m-0 flex ">
						<img class="ml-4 mr-4" src="~@/assets/images/logo.png"  alt="logo"/>
						<div class="text-2xl font-black text-white mt-1">融职商城</div>
				</div>
				<n-menu :options="menuOptions" :value="defaultKey" inverted @update:value="handleUpdateValue" />
		</div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
// 引入合并路由
import {routeModuleList} from '@/router'
// 引入路由
import {useRouter,useRoute} from 'vue-router'
// 引入拆分合并路由结构的方法
import {generatorMenu, renderIcon} from '@/utils'
/*
	递归组装菜单格式
	用自定义的方法将自定义的路由拆分重组
	返回的结构为原有的菜单结构
*/
// 创建路由器对象
const router = useRouter()

// 创建菜单value属性绑定的当前路由

const defaultKey = ref('')

const menuOptions = generatorMenu(routeModuleList)
// 菜单中点击菜单项触发的事件
const handleUpdateValue = (key,item) => {
		// 当前路由名称
		console.log(key)
		// 当前路由对象
		console.log(item)
		// 用户点击菜单时修改路由名称
		defaultKey.value = key
		// 添加路由
		router.push({name: key})
}

onMounted(() => {
		// 定义当前路由对象
		const route = useRoute()
		console.log(route)
		// 获取当前路由的名称
		const routeKey = route.name
		// 页面加载完数据获取当前路由的名称
		defaultKey.value = routeKey
		console.log(routeKey)
})

</script>

<style scoped>

</style>