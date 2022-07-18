<template>
		<div>
				<div class="h-24 w-full bg-white p-3 mb-6">
						<div>
								<span class="text-slate-400 pr-2">首页</span> / <span class="pl-2">轮播图列表</span>
								<div class="pt-3 text-xl text-black font-medium">
										轮播管理
								</div>
						</div>
				</div>
				<div class="content px-4">
						<div class="bg-white pt-4 pr-6">
								<n-form
										ref="formRef"
										inline
										:label-width="80"
										:model="formSearch"
										label-placement="left"
								>
										<n-form-item label="图片名称" path="title">
												<n-input v-model:value="formSearch.title" placeholder="输入标题" />
										</n-form-item>
										<n-form-item label="链接地址" path="url">
												<n-input v-model:value="formSearch.url" placeholder="输入跳转链接" />
										</n-form-item>
										<n-form-item class="ml-auto">
												<n-button type="info" class="mr-10" attr-type="button" @click="searchSubmit">
														<n-icon>
																<SearchOutline></SearchOutline>
														</n-icon>
														搜索
												</n-button>
												<n-button attr-type="button" @click="resetReload">
														<n-icon>
																<RefreshOutline></RefreshOutline>
														</n-icon>
														重置
												</n-button>
										</n-form-item>
								</n-form>
						</div>
						<div class="mt-4 bg-white">
								<div class="text-xl px-6 py-4 flex" >
										<span>轮播图列表</span>
										<span class="ml-auto ">
												<NButton type="info" @click="showModal = true">
														<n-icon>
																<AddSharp></AddSharp>
														</n-icon>
														<span>新建</span>
												</NButton>
										</span>
								</div>
								<div>
										<n-data-table
												:columns="columns"
												:data="data"
												:pagination="pagination"
												:bordered="false"
										/>
										<div class="p-4 flex justify-center pr-10">
												<n-pagination v-model:page="page" @update:page="updatePage" :page-count="totalPages" />
										</div>
								</div>
						</div>
						<AddSlide v-if="showModal" :showModal="showModal" @changeShowModal="changeShowModal" @reloadTable="reload"></AddSlide>
				</div>
		</div>
</template>
<script setup lang="ts">
// onMounted 钩子可以用来在组件完成初始渲染并创建 DOM 节点后运行代码。
// h() 创建虚拟 DOM 节点 (vnode)。
import { h,ref,onMounted} from 'vue'
// 引入封装的轮播图列表的接口
import {users} from '@/api/users'
// 引入获取轮播列表接口的请求
import {slides,getSlides} from '@/api/slide'
// 引入Naive UI库中的组件
import { NButton, useMessage,NAvatar,NSwitch,NIcon,useLoadingBar,NImage} from 'naive-ui'
import {SearchOutline,RefreshOutline,AddSharp} from '@vicons/ionicons5'
// 定义加载条组件
const loadingBar = useLoadingBar()
// 引入添加轮播图组件
import AddSlide from './components/AddSlide.vue'
// 定义总页数
const totalPages = ref(0)
// 定义当前页数
const page = ref(1)
// Naive UI 库中的消息提示
const message = useMessage()
// 存储轮播图的列表信息
const data = ref([])
// 轮播图的id
const img_id = ref(0)

const columns = [
		{
				title: '轮播图片',
				key: 'img_url',
				// 自定义单元格渲染，优先级低于列的 render   row 为获取到的当前行的数据
				render(row){
						// h() 创建虚拟 DOM 节点 (vnode)。 使用组件设置头像是否圆形，头像的地址，头像的尺寸
						return h(NImage,{src:row.img_url,width:'100',height:'100'})
				}
		},
		{
				title: '标题',
				key: 'title'
		},
		{
				title: '链接地址',
				key: 'url'
		},
		{
				title: '是否禁用',
				key: 'is_locked',
				render(row){
						return h(
								NSwitch,
								{
										size:'medium',
										color:'#1890ff',
										activeColor:'#52c41a',
										inactiveColor:'#d9d9d9',
										activeValue:1,
										inactiveValue:0,
										// 绑定返回的轮播图列表数据参数中的是否锁定
										value:row.is_locked == 1 ? false : true,
										onClick:() => {
												console.log(row,'row')
												console.log(NSwitch,'nswitch')
												if (row.is_locked == 1){
														row.is_locked = 0
												}else{
														row.is_locked = 1
												}
										}
								}
						)
				}
		},
		{
				title: '排序',
				key: 'seq',
		},
		{
				title: '更新时间',
				key: 'updated_at',
		},
		{
				title: '操作',
				key: 'created_at',
				render(row){
						return h(
								NButton,
								{
								size: 'small',
								color: '#1890ff',
								strong:true,
								onClick:() => {
										console.log(row)
										// 将轮播图列表数据的id赋值
										img_id.value = row.id;
										console.log(img_id.value)
										// 点击编辑之后显示组件
										showEditModal.value = true
								}
						},'编辑')
				}
		}
]

const pagination = ref(false as const)
// 定义存储轮播图列表数据中的标题和链接地址
const formSearch = ref({
		title:'',
		url:''
})
// 定义添加模态框组件的状态
const showModal = ref(false)
// 定义编辑模态框
const showEditModal = ref(false)
// 定义事件调用的方法
const changeShowModal =　status => {
		showModal.value = status
}

// 通过 onMounted 钩子调用封装后的轮播图列表接口
onMounted(() => {
		// // 调用接口 获取轮播图列表数据
		// users({}).then(res =>{
		// 		console.log(res)
		// 		// 将获取到的轮播图列表信息取出
		// 		data.value = res.data
		// 		// 将获取到的轮播图列表总页数信息取出
		// 		totalPages.value = res.meta.pagination.total_pages
		// 		// 将获取到的轮播图列表当前页信息取出
		// 		page.value = res.meta.pagination.current_page
		// })
		getSlidesList({})
})
// Naive UI库中分页组件通过事件触发的方法
const updatePage = (pageNum) => {
		
		getSlidesList({
				// 轮播图名称
				title:formSearch.value.title,
				// 轮播图邮箱
				url:formSearch.value.url,
				// 将当前页数绑定请求参数中的分页-当前页
				current:pageNum
		})
}
// 定义轮播图搜索点击事件触发的方法
const searchSubmit = () => {
		getSlidesList({
				// 轮播图名称
				title:formSearch.value.title,
				// 轮播图链接
				url:formSearch.value.url,
				// 点击搜索之后获取第一页的数据
				current:1
		})
}
// 定义轮播图重置点击事件触发的方法
const resetReload = () => {
		getSlidesList({})
		// 点击重置之后清空搜索栏内的数据
		formSearch.value = {
				title: '',
				url: ''
		}
}
// 优化接口
const getSlidesList = (params) => {
		// 使用加载条
		loadingBar.start()
		// 获取轮播列表接口的请求
		slides(params).then(res => {
				console.log(res)
				// 将获取到的轮播图列表信息重新绑定赋值
				data.value = res.data
				// 将获取到的轮播图列表总页数信息重新绑定赋值
				totalPages.value = res.meta.pagination.total_pages
				// 将重新获取到的轮播图列表当前页信息重新绑定赋值
				page.value = res.meta.pagination.current_page
				// 加载条结束
				loadingBar.finish()
		}).catch(err => {
				// 出现错误时的加载条效果
				loadingBar.error()
		})
}
// 定义添加轮播图之后自动刷新页面数据的方法
const reload = ()=>{
		getSlidesList({
				current:page.value,
				title:formSearch.value.title,
				url:formSearch.value.url
		})
}
</script>

<style scoped>

</style>