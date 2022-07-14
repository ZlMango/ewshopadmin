<template>
		<n-modal v-model:show="props.showModal" @update:show="$emit('changeShowModal',false)" :mask-closable="true">
				<n-card
						style="width: 600px"
						title="添加轮播图"
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
								<n-form-item path="name" label="标题">
										<n-input v-model:value="model.title" placeholder="请输入标题"/>
								</n-form-item>
								<n-form-item path="email" label="跳转URL">
										<n-input
												v-model:value="model.url"
												type="email"
												placeholder="请输入跳转URL"
										/>
								</n-form-item>
								<n-form-item label="是否启用" path="status">
										<n-radio-group v-model:value="model.status" name="status">
												<n-space>
														<n-radio :value="0">
																否
														</n-radio>
														<n-radio :value="1">
																是
														</n-radio>
												</n-space>
										</n-radio-group>
								</n-form-item>
								<n-form-item label="图片上传" path="img">
										<Upload @backKey="backKey"></Upload>
								</n-form-item>
								<n-row :gutter="[0, 24]">
										<n-col :span="24">
												<div style="display: flex; justify-content: flex-end">
														<n-button
																round
																type="primary"
																@click="slideSubmit"
														>
																提交
														</n-button>
												</div>
										</n-col>
								</n-row>
						</n-form>
				</n-card>
		</n-modal>
</template>
<script setup>
import {ref,} from 'vue'
// 引入上传图片的组件
import Upload from '@/components/Upload/index.vue'
// 引入添加轮播接口的请求
import {addSlides} from '@/api/slide'
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
		title:null,
		img:null,
		url:null,
		status:null
})
//  验证规则
const rules = {
		title: [
				{
						required: true,
						message: '请输入标题'
				}
		],
		img: [
				{
						required: true,
						message: '上传图片'
				}
		],
		url: [
				{
						required: true,
						message: '请输入图片地址'
				}
		],
		status: [
				{
						required: true,
						message: '请选择状态'
				}
		],
}

const formRef = ref()

// 提交方法
const slideSubmit = (e) => {
		// 事件对象  preventDefault取消事件的默认动作。
		e.preventDefault();
		formRef.value.validate(errors => {
				if (errors){
						console.log(errors,'errors')
				}else{
						// 请求 api 添加数据
						addSlides(model.value).then(res => {
								console.log(res)
								window.$message.success('添加成功')
								emit('changeShowModal',false);
								emit('reloadTable')
						})
						console.log(model.value)
				}
		})
}

const backKey = (key) => {
		// 获取随机生成的文件名
		model.value.img = key
}

</script>

<style scoped>

</style>