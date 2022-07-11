<template>
		<div class="pt-4">
				<div class="m-0">
						<img class="m-auto" src="~@/assets/images/logo.png"  alt="logo"/>
				</div>
				<n-menu :options="menuOptions" inverted @update:value="handleUpdateValue" />
				<!--    <n-menu-->
				<!--        :inverted="true"-->
				<!--        :collapsed-width="64"-->
				<!--        :collapsed-icon-size="22"-->
				<!--        :options="menuOptions"-->
				<!--        @update:value="selectMenu"-->
				<!--        :value="routeKey"-->
				<!--    />-->
		</div>
</template>

<script lang="ts" setup>
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
// 创建路由对象
const router = useRouter()
const menuOptions = generatorMenu(routeModuleList)
// 菜单中点击菜单项触发的事件
const handleUpdateValue = (key,item) => {
		// console.log(key)
		// console.log(item)
		// 添加路由
		router.push({name: key})
}
</script>

<style scoped>

</style>