// 引入定义存储的方法
import { defineStore } from 'pinia'
// 引入登录接口的请求
import {login} from '@/api/auth'

// 引入获取登录信息接口的请求
import {user} from '@/api/auth'

// 定义接口 限制存储的类型结构
export interface IUserStore{
	token: string;
	username: string;
	avatar: string;
	permissions: string[];
	info:object;
}
// 定义存储对象
export const useUserStore = defineStore({
	// 定义一个id  这个id是必须的  作为第一个参数传递
	id: 'app-user',
	state: ():IUserStore => ({
		token:localStorage.getItem('token') || '',
		username:'',
		avatar:'',
		permissions: [],
		info: {}
	}),
	// 定义获取存储数据时调用的方法
	getters:{
		getToken():string {
			return this.token;
		},
		getUsername():string {
			return this.username;
		},
		getAvatar():string {
			return this.avatar;
		},
		getPermissions():string[]{
			return this.permissions;
		},
		getInfo():Object{
			return this.info;
		}
	},
	// 定义修改存储数据时调用的方法
	actions: {
		setToken(token:string){
			// 将用户登录获取到的token存储到本地
			localStorage.setItem('token',token);
			this.token = token
		},
		setUsername(username:string){
			this.username = username
		},
		setAvatar(avatar:string){
			this.avatar = avatar
		},
		setPermissions(permissions:string[]){
			this.permissions = permissions
		},
		setUserInfo(info: Object){
			this.info = info
		},
		// 定义登录异步请求的方法
		async login(userInfo: Object){
			try {
				const response = await login(userInfo);
				if (response.access_token){
					this.setToken(response.access_token)

					await this.getUser()
				}
			} catch (error) {
				console.log(error)
			}
		},
		// 定义获取用户信息的异步请求
		async getUser(){
			try{
				const response = await user()
				console.log(response)
				this.setUserInfo(response)
				this.setAvatar(response.avatar)
				this.setUsername(response.name)
			}catch (error) {
				console.log(error)
			}
		}
	}
})