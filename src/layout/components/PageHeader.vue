<template>
		<div class="w-full h-14 flex items-center overflow-hidden justify-end px-8 shadow shadow-sky-500">
				<!--	下拉菜单		-->
				<n-dropdown :options="options" @select="select">
						<div class="flex items-center">
								<n-avatar round size="small" src="https://api.shop.eduwork.cn/image/avatar.png"/>
								<span class="pl-2">
										超级管理员
								</span>
						</div>
				</n-dropdown>
		</div>
</template>
<script setup lang="ts">
import {LogOutOutline} from '@vicons/ionicons5'
import {ref} from 'vue'
import {renderIcon} from '@/utils';
import {logout} from '@/api/auth'
import {LogOutOutline as logoutIcon} from '@vicons/ionicons5'
// 引入 pinia 中的存储用户信息的对象
import {useUserStore} from "@/store/user"
// 创建用户数据存储对象
const userStore = useUserStore()
const options = ref([
		{
				label:'退出登录',
				key: 'logout',
				icon:renderIcon(LogOutOutline)
		}
])

// 用户点击头像退出登录触发该事件
const select = (key:string) => {
		switch(key){
				case 'logout':
						logout().then(() =>{
								// 清除tken
								localStorage.removeItem('token');
								// 页面数据重新加载  数据刷新
								window.location.reload();
						})
						break;
				default:
						break;
		}
}
</script>

<style scoped>

</style>