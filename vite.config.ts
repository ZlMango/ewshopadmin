import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// 自动引入插件  引入之后在组件中使用ui库可直接使用 无需引入
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'

// 引入path模块中的resolve方法
import {resolve} from 'path'
// 定义获取当前位置路径的方法
function pathResolve(dir:string){
	// resolve中的process.cwd()方法代表从哪个位置执行的cmd 就代表哪个路径
	return resolve(process.cwd(),'.',dir)
}
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			resolvers: [NaiveUiResolver()]
		})
	],
	// Record<string, string> | Array<{ find: string | RegExp, replacement: string }>
	// 配置路径别名
	resolve:{
		alias:[
			{
				// 定义路径别名
				find:'@',
				// 设置定义别名的路径  参数为要拼接的路径
				replacement:pathResolve('src')
				/*
				 因为项目要上传到github中 项目成员从github中获取项目
				 如果项目存放路径不同项目无法该别名无法使用
				 每个项目组成员需根据自己的项目存放盘符进行修改
				*/
				// replacement:'D:/code/ewshopadmin/src'
			}
		]
	},
	// 配置服务器
	server:{
		//  指定本机服务器
 		host:'localhost',
		//  指定端口号
		port:8080,
	}
})
