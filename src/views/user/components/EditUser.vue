<template>
		<n-modal v-model:show="props.showEditModal" @update:show="$emit('changeEditModal',false)" :mask-closable="true">
				<n-card
						style="width: 600px"
						title="编辑用户 "
						:bordered="false"
						size="huge"
						role="dialog"
						aria-modal="true"
				>
						<template #header-extra >
								<!--	在组件的模板表达式中，可以直接使用 $emit 函数触发自定义事件	-->
								<span @click="$emit('changeEditModal',false)">X</span>
						</template>
						
						
						<n-form v-if="showForm" ref="formRef" :model="model" :rules="rules">
								<n-form-item path="name" label="姓名">
										<n-input v-model:value="model.name" placeholder="请输入姓名"/>
								</n-form-item>
								<n-form-item path="email" label="邮箱">
										<n-input
												v-model:value="model.email"
												type="email"
												placeholder="请输入邮箱"
										/>
								</n-form-item>
								<n-row :gutter="[0, 24]">
										<n-col :span="24">
												<div style="display: flex; justify-content: flex-end">
														<n-button
																round
																type="primary"
																@click="userSubmit"
														>
																提交
														</n-button>
												</div>
										</n-col>
								</n-row>
						</n-form>
						<n-skeleton v-else text :repeat="2" />
						
				</n-card>
		</n-modal>
</template>

<script setup>
import {addUser,getUserInfo,updateUser} from '@/api/users'
import {ref,h,onMounted} from 'vue'
// 接收父组件传输的数据  props 传进来的参数是不允许被修改的
const props = defineProps({
		// 接收父组件的数据
		showEditModal:{
				type:Boolean,
				default:false
		},
		// 接收用户id
		user_id:{
				type:Number,
				default:''
		}
})
// 子组件通过 defineEmits()方法声明emits  emits声明由组件触发的自定义事件 声明父组件传递的事件
const emit = defineEmits(['changeEditModal','reloadTable'])
// 定义表单绑定属性
const showForm = ref(false)
onMounted(() => {
		if (props.user_id){
				getUserInfo(props.user_id).then(res => {
						model.value.email = res.email
						model.value.name = res.name
						showForm.value = true
				})
		}
})
// 模态框数据模型
const model = ref({
		name:'',
		email:'',
})
//  验证规则
const rules = {
		name: [
				{
						required: true,
						message: '请输入姓名'
				}
		],
		email: [
				{
						required: true,
						message: '请输入邮箱'
				}
		],

}

const formRef = ref()

// 修改方法
const userSubmit = (e) => {
		// 事件对象 阻止事件冒泡
		e.preventDefault();
		formRef.value.validate(errors => {
				if (errors){
						console.log(errors)
				}else{
						// 调用更新用户信息接口的请求
						updateUser(props.user_id,model.value).then(res => {
								console.log(res)
								 window.$message.success('修改成功')
								emit('changeEditModal',false);
								emit('reloadTable')
						})
				}
		})
}
</script>

<style scoped>

</style>