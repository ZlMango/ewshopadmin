<template>
		<div class="w-full h-14 flex items-center overflow-hidden justify-end px-8 shadow shadow-sky-500">
				<!--	头像	-->
<!--				<n-diropdown :options="options" @select="select">
						<div class="flex items-center">
								<n-avatar round size="small" src="https://api.shop.eduwork.cn/image/avatar.png"/>
								<span class="pl-2">超级管理员</span>
						</div>
				</n-diropdown>-->
		</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
// // import {renderIcon} from '@/utils';
import {logout} from '@/api/auth'
// import {LogOutOutline} from '@vicons/ionicons5'
const options = ref([
		{
				label:'退出登录',
				key: 'logout',
				// icon:renderIcon(LogoutIcon)
		}
])

const select = (key:string) => {
		switch(key){
				case 'logout':
						logout().then(() =>{
								localStorage.removeItem('token');
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