<template>
		<n-layout has-sider position="absolute">
				<n-layout-sider content-style="background-color:#001529" class=" h-screen ">
						<page-sider></page-sider>
				</n-layout-sider>
				<n-layout>
						<n-layout-header>
								<PageHeader></PageHeader>
						</n-layout-header>
						<n-layout-content content-style="padding: 0px;background-color:#f0f2f5">
								<div class="content">
										<router-view></router-view>
								</div>
						</n-layout-content>
						<n-layout-footer>
								<div class="text-center">
										<span>Copyright © 2020</span>
								</div>
						</n-layout-footer>
				</n-layout>
		</n-layout>
</template>

<script setup>
import PageHeader from './components/PageHeader.vue'
import PageSider from './components/PageSider.vue'
// 引入提示消息的组件
import { useMessage } from 'naive-ui'
window.$message = useMessage()
</script>

<style scoped>
.content{
		max-height:calc(100vh - 130px);
		height:calc(100vh - 130px);
}
</style>