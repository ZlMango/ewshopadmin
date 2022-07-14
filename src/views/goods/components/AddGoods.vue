<template>
		<n-modal v-model:show="props.showModal" @update:show="$emit('changeShowModal',false)" :mask-closable="true">
				<n-card
						style="width: 600px"
						title="添加商品"
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
								
										<Editor @backContent="backContent"></Editor>
							
								<n-row :gutter="[0, 24]" >
										<n-col :span="24">
												<div style="display: flex; justify-content: flex-end; margin-top: 10px">
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
<script setup>
import {ref,h} from 'vue'

// 引入富文本编辑器
import Editor from '@/components/Editor/index.vue'

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
		details:'',
})
//  验证规则
const rules = {
		details: [
				{
						required: true,
						message: '详情'
				}
		]
}

const formRef = ref()



// 提交方法
const userSubmit = (e) => {
		// 事件对象 取消事件默认操作
		e.preventDefault();
		console.log(model.value)
}


const backContent = (htmlContent) => {
		model.value.details = htmlContent
}

</script>

<style scoped>

</style>