<template>
		<n-modal v-model:show="props.showModal" @update:show="$emit('changeShowModal',false)" :mask-closable="true">
				<n-card
						style="width: 600px"
						title="添加用户 "
						:bordered="false"
						size="huge"
						role="dialog"
						aria-modal="true"
				>
						<template #header-extra >
								<!--	在组件的模板表达式中，可以直接使用 $emit 函数触发自定义事件	-->
								<span @click="$emit('changeShowModal',false)">X</span>
						</template>
						<n-form ref="formRef" :model="model" :rules="rules">
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
								<n-form-item
										path="password"
										label="密码"
								>
										<n-input
												v-model:value="model.password"
												type="password"
												placeholder="请输入密码"
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
																添加
														</n-button>
												</div>
										</n-col>
								</n-row>
						</n-form>
				</n-card>
		</n-modal>
</template>
<script setup lang="ts">
import {addUser} from '@/api/users'
import {ref,h} from 'vue'
// 接收父组件传输的数据  props 传进来的参数是不允许被修改的
const props = defineProps({
		showModal:{
				type:Boolean,
				default:false
		}
})
// 子组件通过 defineEmits()方法声明emits  emits声明由组件触发的自定义事件 声明父组件传递的事件
const emit = defineEmits(['changeShowModal','reloadTable'])
// 模态框数据模型
const model = ref({
		name:'',
		email:'',
		password:''
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
		password: [
				{
						required: true,
						message: '请输入密码'
				}
		],
}

const formRef = ref()

// 提交方法
const userSubmit = (e) => {
		// 事件对象 阻止事件冒泡
		e.preventDefault();
		formRef.value.validate(errors => {
				if (errors){
						console.log(errors)
				}else{
						// 调用添加用户接口的请求
					  addUser(model.value).then(res => {
								console.log(res)
							  emit('changeShowModal',false);
							  emit('reloadTable')
					  })
				}
		})
}
</script>

<style scoped>

</style>