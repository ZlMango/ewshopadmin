<template>
		<div>
				<div class="h-24 w-full bg-white p-3 mb-6">
						<div>
								<span class="text-slate-400 pr-2">首页</span> / <span class="pl-2">分类列表</span>
								<div class="pt-3 text-xl text-black font-medium">
										评论管理
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
										<n-form-item label="商品名" path="name">
												<n-input style="width:300px" v-model:value="formSearch.name" placeholder="输入商品名" />
										</n-form-item>
										<n-form-item label="评级" path="email">
												<n-button  class="" :round="false"  attr-type="button" @click="searchSubmit">
														好评
												</n-button>
												<n-button   attr-type="button" @click="searchSubmit">
														中评
												</n-button>
												<n-button   attr-type="button" @click="searchSubmit">
														差评
												</n-button>
										</n-form-item>
										<n-form-item class="ml-auto">
												<n-button attr-type="button"  class="mr-2" @click="resetReload">
														<n-icon>
																<RefreshOutline></RefreshOutline>
														</n-icon>
														重置
												</n-button>
												<n-button type="info"   attr-type="button" @click="searchSubmit">
														<n-icon>
																<SearchOutline></SearchOutline>
														</n-icon>
														查询
												</n-button>
										</n-form-item>
								</n-form>
						</div>
						<div class="mt-4 bg-white">
								<div>
										<n-data-table
												:columns="columns"
												:data="data"
												:pagination="pagination"
												:bordered="false"
										/>
								</div>
						</div>
				</div>
		</div>
</template>
<script setup lang="ts">
// onMounted 钩子可以用来在组件完成初始渲染并创建 DOM 节点后运行代码。
// h() 创建虚拟 DOM 节点 (vnode)。
import { h,ref,onMounted} from 'vue'
// 引入封装的用户列表的接口
import {users} from '@/api/users'
// 引入按钮 消息提示 头像组件 开关组件 图标组件
import { NButton, useMessage,NAvatar,NSwitch,NIcon,useLoadingBar} from 'naive-ui'
import {SearchOutline,RefreshOutline,AddSharp} from '@vicons/ionicons5'
// 定义加载条组件
const loadingBar = useLoadingBar()
// 引入添加用户组件
import AddComment from '@/views/comment/components/AddComment.vue'
// 引入编辑用户组件
import EditComment from '@/views/comment/components/EditComment.vue'
// 定义总页数
const totalPages = ref(0)
// 定义当前页数
const page = ref(1)
// Naive UI 库中的消息提示
const message = useMessage()
// 存储用户的列表信息
const data = ref([])
// 用户的id
const user_id = ref('')

const columns = [
		{
				title: '内容',
				
		},
		{
				title: '评级',
				// key: 'name'
		},
		{
				title: '星级',
				// key: 'email'
		},
		{
				title:'回复',
				// key: 'is_locked',
				
		},
		{
				title: '评价时间',
				// key: 'created_at',
		},
		{
				title: '操作',
				// key: 'created_at',
		}
]

const pagination = ref(false as const)
// 定义存储用户列表数据中的名称和邮箱
const formSearch = ref({
		name:'',
		email:''
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
// 通过 onMounted 钩子调用封装后的用户列表接口
onMounted(() => {
		getUserList({})
})
// Naive UI库中分页组件通过事件触发的方法
const updatePage = (pageNum) => {
		getUserList({
				// 用户名称
				name:formSearch.value.name,
				// 用户邮箱
				email:formSearch.value.email,
				// 将当前页数绑定请求参数中的分页-当前页
				current:pageNum
		})
}
// 定义用户搜索点击事件触发的方法
const searchSubmit = () => {
		getUserList({
				// 用户名称
				name:formSearch.value.name,
				// 用户邮箱
				email:formSearch.value.email,
				// 点击搜索之后获取第一页的数据
				current:1
		})
}
// 定义用户重置点击事件触发的方法
const resetReload = () => {
		getUserList({})
		// 点击重置之后清空搜索栏内的数据
		formSearch.value = {
				name: '',
				email: ''
		}
}
// 优化接口
const getUserList = (params) => {
		// 使用加载条
		loadingBar.start()
		users(params).then(res => {
				// 将获取到的用户列表信息重新绑定赋值
				// data.value = res.data
				// 将获取到的用户列表总页数信息重新绑定赋值
				// totalPages.value = res.meta.pagination.total_pages
				// 将重新获取到的用户列表当前页信息重新绑定赋值
				// page.value = res.meta.pagination.current_page
				// 加载条结束
				loadingBar.finish()
		}).catch(err => {
				// 出现错误时的加载条效果
				loadingBar.error()
		})
}
// 定义添加用户之后自动刷新页面数据的方法
const reload = ()=>{
		getUserList({
				current:page.value,
				name:formSearch.value.name,
				email:formSearch.value.email
		})
}
</script>

<style scoped>

</style>