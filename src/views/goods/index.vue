<template>
		<div>
				<div class="h-24 w-full bg-white p-3 mb-6">
						<div>
								<span class="text-slate-400 pr-2">首页</span> / <span class="pl-2">商品列表</span>
								<div class="pt-3 text-xl text-black font-medium">
										商品管理
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
										<n-form-item label="商品名:" path="title">
												<n-input v-model:value="formSearch.title" style="width:350px" placeholder="请输入" />
										</n-form-item>
										<n-form-item label="是否上架" path="is_on">
												<n-button>未上架</n-button>
												<n-button>已上架</n-button>
										</n-form-item>
										<n-form-item class="ml-auto">
												<n-button attr-type="button" @click="resetReload">
														<n-icon>
																<RefreshOutline></RefreshOutline>
														</n-icon>
														重置
												</n-button>
												<n-button type="info" class="mr-10 ml-3" attr-type="button" @click="searchSubmit">
														<n-icon>
																<SearchOutline></SearchOutline>
														</n-icon>
														查询
												</n-button>
										</n-form-item>
								</n-form>
						</div>
						<div class="mt-4 bg-white">
								<div class="text-xl px-6 py-4 flex" >
										<span>商品列表</span>
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
						<AddGoods v-if="showModal" :showModal="showModal" @changeShowModal="changeShowModal" @reloadTable="reload"></AddGoods>
						<EditGoods v-if="showEditModal" :user_id="user_id" :showEditModal="showEditModal" @changeEditModal="changeEditModal" @reloadTable="reload"></EditGoods>
				</div>
		</div>
</template>
<script setup lang="ts">
// onMounted 钩子可以用来在组件完成初始渲染并创建 DOM 节点后运行代码。
// h() 创建虚拟 DOM 节点 (vnode)。
import { h,ref,onMounted} from 'vue'
// 引入封装的商品列表的接口
import {goodList} from '@/api/goods'
// 引入组件
import { NButton, useMessage,NImage,NSwitch,NIcon,useLoadingBar} from 'naive-ui'
import {SearchOutline,RefreshOutline,AddSharp} from '@vicons/ionicons5'
// 定义加载条组件
const loadingBar = useLoadingBar()
// 引入添加商品组件
import AddGoods from '@/views/goods/components/AddGoods.vue'
// 引入编辑商品组件
import EditGoods from '@/views/goods/components/EditGoods.vue'
// 定义总页数
const totalPages = ref(0)
// 定义当前页数
const page = ref(1)
// Naive UI 库中的消息提示
const message = useMessage()
// 存储商品的列表信息
const data = ref([])
// 商品的id
const user_id = ref('')

const is_on = ref(0)
const is_recommend = ref(0)
const columns = [
		{
				title: '商品图',
				key: 'cover_url',
				// 自定义单元格渲染，优先级低于列的 render   row 为获取到的当前行的数据
				render(row){
						// h() 创建虚拟 DOM 节点 (vnode)。 使用组件设置头像是否圆形，头像的地址，头像的尺寸
						return h(NImage,{src:row.cover_url,width:'80'})
				}
		},
		{
				title: '商品名',
				key: 'title'
		},
		{
				title: '价格',
				key: 'price'
		},
		{
				title: '库存',
				key: 'stock'
		},
		{
				title: '销量',
				key: 'sales'
		},
		{
				title: '是否上架',
				key: 'is_on',
				render(row){
						return h(
								NSwitch,
								{
										id:'',
										size:'large',
										color:'#1890ff',
										activeColor:'#52c41a',
										inactiveColor:'#d9d9d9',
										activeValue:1,
										inactiveValue:0,
										// 绑定返回的商品列表数据参数中的是否锁定
										value:row.is_on == 1 ? false : true,
										onClick:() => {
												if (row.is_on == 1){
														row.is_on = 0
												}else{
														row.is_on = 1
												}
										}
								}
						)
				}
		},
		{
				title: '是否推荐',
				key: 'is_recommend',
				render(row){
						return h(
								NSwitch,
								{
										size:'large',
										color:'#1890ff',
										activeColor:'#52c41a',
										inactiveColor:'#d9d9d9',
										activeValue:1,
										inactiveValue:0,
										// 绑定返回的商品列表数据参数中的是否锁定
										value:row.is_locked == 1 ? false : true,
										onClick:() => {
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
				title: '创建时间',
				key: 'created_at',
		},
		{
				title: '操作',
				key: 'title',
				render(row){
						return h(
								'div',
								{
										innerHTML: '编辑',
										class:'cursor-pointer',
										style: {color: 'blue'},
										onClick:() => {
										// 将商品列表数据的id赋值
										user_id.value = row.id;
										// 点击编辑之后显示组件
										showEditModal.value = true
								}}
						)
				}
		}
]

const pagination = ref(false as const)
// 定义存储商品列表数据中的名称和邮箱
const formSearch = ref({
		title:'',
})
// 定义添加模态框组件的状态
const showModal = ref(false)
// 定义编辑模态框
const showEditModal = ref(false)
// 定义事件调用的方法
const changeShowModal =　status => {
		showModal.value = status
}
const changeEditModal = status => {
		showEditModal.value = status
}
// 通过 onMounted 钩子调用封装后的商品列表接口
onMounted(() => {
		getUserList({})
})
// Naive UI库中分页组件通过事件触发的方法
const updatePage = (pageNum) => {
		getUserList({
				// 商品名称
				// title:formSearch.value.title,
				// 将当前页数绑定请求参数中的分页-当前页
				current:pageNum
		})
}
// 定义商品搜索点击事件触发的方法
const searchSubmit = () => {
		getUserList({
				// 商品名称
				title:formSearch.value.title,
				// 点击搜索之后获取第一页的数据
				current:1
		})
}
// 定义商品重置点击事件触发的方法
const resetReload = () => {
		getUserList({})
		// 点击重置之后清空搜索栏内的数据
		formSearch.value = {
				title: '',
		}
}
// 优化接口
const getUserList = (params) => {
		// 使用加载条
		loadingBar.start()
		// 获取商品列表接口请求
		goodList(params).then(res => {
				console.log(res.meta)
				console.log(res.data)
				// 将获取到的商品列表信息重新绑定赋值
				data.value = res.data
				// 将获取到的商品列表总页数信息重新绑定赋值
				totalPages.value = res.meta.pagination.total_pages
				// 将重新获取到的商品列表当前页信息重新绑定赋值
				page.value = res.meta.pagination.current_page
				// 加载条结束
				loadingBar.finish()
		}).catch(err => {
				// 出现错误时的加载条效果
				loadingBar.error()
		})
}
// 定义添加商品之后自动刷新页面数据的方法
const reload = ()=>{
		getUserList({
				current:page.value,
				title:formSearch.value.title,
		})
}
</script>

<style scoped>

</style>