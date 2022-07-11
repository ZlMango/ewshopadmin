<template>
		<div class="view-account">
				<div class="view-account-header"></div>
				<div class="view-account-container">
						<div class="view-account-top">
								<div class="view-account-top-logo m-0">
										<img class="m-auto" src="../../../src/assets/images/logo.png" alt="">
								</div>
						</div>
						<div class="view-account-from">
								<n-form
										ref="formRef"
										label-placement="left"
										size="large"
										:model="formInline"
										:rules="rules"
								>
										<n-form-item path="username">
												<n-input v-model:value="formInline.username" placeholder="请输入用户名">
														<template #prefix>
																<n-icon size="18" color="#808695">
																		<PersonOutline/>
																</n-icon>
														</template>
												</n-input>
										</n-form-item>
										
										<n-form-item path="password">
												<n-input
														v-model:value="formInline.password"
														type="password"
														showPasswordOn="click"
														placeholder="请输入密码"
												>
														<template #prefix>
																<n-icon size="18" color="#808695">
																		<LockClosedOutline/>
																</n-icon>
														</template>
												</n-input>
										</n-form-item>
										<n-form-item>
												<n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
														登录
												</n-button>
										</n-form-item>
								</n-form>
						</div>
				</div>
		</div>
</template>

<script setup lang="ts">
// 引入提示消息的组件
import { useMessage } from 'naive-ui'
// 创建消息提示的方法
const message = useMessage()

window.$message = useMessage()
import {reactive, ref ,defineComponent} from 'vue';
import {PersonOutline, LockClosedOutline} from '@vicons/ionicons5';
// 在登录页中将pinia中的存储对象引入
import {useUserStore} from '@/store/user'
// 引入路由
import {useRouter} from 'vue-router'

interface FormState {
		email: string;
		password: string;
}
// 定义路由
const router = useRouter();

const userStore = useUserStore();

const loading = ref(false)
const formInline = reactive({
		username: 'super@a.com',
		password: '123123',
});
const formRef = ref();

const rules = {
		username: {required: true, message: '请输入用户名', trigger: 'blur'},
		password: {required: true, message: '请输入密码', trigger: 'blur'},
};
const handleSubmit = (e: Event) => {
		e.preventDefault();
		// 表单验证
		formRef.value.validate(async (errors: any) => {
				if (errors) {
						return;
				}
				// 接收数据
				const {username, password} = formInline;
				
				// 显示登陆中
				loading.value = true;
				// 调整数据结构
				const data: FormState = {
						email: username,
						password,
				}
				// 执行登陆操作
				userStore.login(data).then(res => {
						// 关闭按钮的登录状态
						loading.value = false
						console.log(data)
						message.success('登录成功')
						// 用户登录成功跳转到首页
						router.push({name:'dashboard'})
						// window.location.href = 'dashboard';
				}).catch(err => {
						// 关闭按钮的登录状态
						loading.value = false
						//弹出登录失败的提示
						// message.warning('登录失败！请核对账号和密码后重新登录!')
				})
				// 成功后跳转到首页
				// 失败后提示
		});
}
</script>
<style lang="less" scoped>
.view-account {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: auto;
		
		&-container {
				flex: 1;
				padding: 32px 12px;
				max-width: 384px;
				min-width: 320px;
				margin: 0 auto;
		}
		
		&-top {
				padding: 32px 0;
				text-align: center;
				
				&-desc {
						font-size: 14px;
						color: #808695;
				}
		}
		
		&-other {
				width: 100%;
		}
		
		.default-color {
				color: #515a6e;
				
				.ant-checkbox-wrapper {
						color: #515a6e;
				}
		}
}

@media (min-width: 768px) {
		.view-account {
				background-image: url('../../assets/images/login.svg');
				background-repeat: no-repeat;
				background-position: 50%;
				background-size: 100%;
		}
		
		.page-account-container {
				padding: 32px 0 24px 0;
		}
}
</style>