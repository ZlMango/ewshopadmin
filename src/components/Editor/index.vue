<template>
		<!-- ref属性用来给元素或者子组件注册引用信息（id的替代者） -->
		<QuillEditor ref="editor" theme="snow" @update:content="updateContent"/>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {ref} from 'vue'
// 声明父组件自定义的事件
const emit = defineEmits(['backContent'])
const editor = ref()
// VueQuill 中更新数据事件调用的方法
const updateContent = (e) => {
		console.log(e)
		emit('backContent',editor.value.getHTML())
}
</script>

<style scoped>

</style>