<template>
		<div>
				<div class="h-24 w-full bg-white p-3 mb-6">
						<div>
								<span class="text-slate-400 pr-2">首页</span> / <span class="pl-2">分类列表</span>
								<div class="pt-3 text-xl text-black font-black">
										分类管理
								</div>
						</div>
				</div>
				<div class="content px-4">
						<n-button type="info" class="mr-10" attr-type="button" @click="searchSubmit">
								添加分类
						</n-button>
				</div>
				<div class="mt-4 bg-white m-4">
						<div>
								<n-data-table
										:columns="columns"
										:data="data"
										:pagination="pagination"
										:bordered="false"
								/>
						</div>
						<div class="p-4 flex justify-center pr-10">
								<n-pagination v-model:page="page"  :page-count="totalPages" />
						</div>
				</div>
		</div>
</template>
<script setup lang="ts">
import { h,ref,onMounted,defineComponent} from 'vue'
// 引入封装的分类列表的接口
import {sortList} from '@/api/sort'
// 引入按钮 消息提示 头像组件 开关组件 图标组件
import { NButton, useMessage,NAvatar,NSwitch,NIcon,useLoadingBar,TreeOption,MenuOption,DataTableColumns} from 'naive-ui'
// 定义总页数
const totalPages = ref(0)
// 定义当前页数
const page = ref(1)
// 存储分类的列表信息

const sortId = ref()

const data = ref([])
const pagination = ref(false as const)

const columns = [
				{
						title: '分类名称',
						key: 'name',
						level:2,
						status:1,
						
				},
				{
						title: '操作',
						key: '操作'   ,
						render (row) {
								return h(
										'div',
										'操作'
								)
						}
				}
]
onMounted(() => {
		sortList({}).then(res =>{
				// console.log(res)
				data.value = res.data
				sortId.value = res.id
		})
})
</script>

<style scoped>

</style>