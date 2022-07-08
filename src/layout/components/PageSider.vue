<template>
		<div class="pt-4">
				<div class="m-0">
						<img class="m-auto" src="~@/assets/images/logo.png"  alt="logo"/>
				</div>
<!--				<n-menu :options="menuOptions" inverted @update:value="handleUpdateValue" />-->
				<!--    <n-menu-->
				<!--        :inverted="true"-->
				<!--        :collapsed-width="64"-->
				<!--        :collapsed-icon-size="22"-->
				<!--        :options="menuOptions"-->
				<!--        @update:value="selectMenu"-->
				<!--        :value="routeKey"-->
				<!--    />-->
		</div>
</template>

<script lang="ts" setup>
// import {  ref } from 'vue'
// import {generatorMenu, renderIcon} from "@/utils";
// import {
//   BookOutline as BookIcon,
//   PersonOutline as PersonIcon
// } from '@vicons/ionicons5'
// import { useRoute, useRouter } from 'vue-router';
// import {routeModuleList}  from '@/router/index'
//
// const router = useRouter()
// import {generatorMenu, renderIcon} from '@/utils'
// const menuOptions = generatorMenu(routeModuleList)
// const handleUpdateValue=(key,item) =>{
// 		router.push({name:key})
// }
// const menuOptions: MenuOption[] = [
//   {
//     label: '首页',
//     key: 'go-back-home',
//     icon: renderIcon(HomeIcon)
//   },
//   {
//     key: 'divider-1',
//     type: 'divider',
//     props: {
//       style: {
//         marginLeft: '32px'
//       }
//     }
//   },
//   {
//     label: () =>
//         h(
//             'a',
//             {
//               href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F',
//               target: '_blank',
//               rel: 'noopenner noreferrer'
//             },
//             '且听风吟'
//         ),
//     key: 'hear-the-wind-sing',
//     icon: renderIcon(BookIcon)
//   },
//   {
//     label: '1973年的弹珠玩具',
//     key: 'pinball-1973',
//     icon: renderIcon(BookIcon),
//     disabled: true,
//     children: [
//       {
//         label: '鼠',
//         key: 'rat'
//       }
//     ]
//   },
//   {
//     label: '寻羊冒险记',
//     key: 'a-wild-sheep-chase',
//     icon: renderIcon(BookIcon),
//     disabled: true
//   },
//   {
//     label: '舞，舞，舞',
//     key: 'dance-dance-dance',
//     icon: renderIcon(BookIcon),
//     children: [
//       {
//         type: 'group',
//         label: '人物',
//         key: 'people',
//         children: [
//           {
//             label: '叙事者',
//             key: 'narrator',
//             icon: renderIcon(PersonIcon)
//           },
//           {
//             label: '羊男',
//             key: 'sheep-man',
//             icon: renderIcon(PersonIcon)
//           }
//         ]
//       },
//       {
//         label: '饮品',
//         key: 'beverage',
//         icon: renderIcon(WineIcon),
//         children: [
//           {
//             label: '威士忌',
//             key: 'whisky'
//           }
//         ]
//       },
//       {
//         label: '食物',
//         key: 'food',
//         children: [
//           {
//             label: '三明治',
//             key: 'sandwich'
//           }
//         ]
//       },
//       {
//         label: '过去增多，未来减少',
//         key: 'the-past-increases-the-future-recedes'
//       }
//     ]
//   }
// ]

// import router, {routeModuleList} from '@/router/index';
// console.log(generatorMenu(routeModuleList),123);
// const route = useRouter()
// console.log(route,1111111111)
// console.log(routeModuleList,123)
// const menuOptions = ref(generatorMenu(routeModuleList))
// // 获取当前页面的路由名称
// const getCurrentRouteName = () => {
//   const { name } = route.currentRoute.value
//   return name
// }
// console.log(getCurrentRouteName(),'11111111');
// const routeKey = ref(getCurrentRouteName())
// const selectMenu = (key) =>{
//   console.log(key,123)
//   routeKey.value = key
//   router.push({name:key})
// }
// const menuOptions = ref([
//   {
//     label: '且听风吟',
//     key: 'hear-the-wind-sing',
//     icon: renderIcon(BookIcon)
//   },
//   {
//     label: '1973年的弹珠玩具',
//     key: 'pinball-1973',
//     icon: renderIcon(PersonIcon),
//     children: [
//       {
//         label: '鼠',
//         key: 'rat'
//       }
//     ]
//   },
//   {
//     label: '寻羊冒险记',
//     key: 'a-wild-sheep-chase',
//     icon: renderIcon(BookIcon)
//   },
//   {
//     label: '舞，舞，舞',
//     key: 'dance-dance-dance',
//     icon: renderIcon(BookIcon),
//     children: [
//       {
//         type: 'group',
//         label: '人物',
//         key: 'people',
//         children: [
//           {
//             label: '叙事者',
//             key: 'narrator',
//             icon: renderIcon(PersonIcon)
//           },
//           {
//             label: '羊男',
//             key: 'sheep-man',
//             icon: renderIcon(PersonIcon)
//           }
//         ]
//       }
//
//     ]
//   }
// ])

</script>

<style scoped>

</style>