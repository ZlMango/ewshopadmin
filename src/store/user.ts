// 引入定义存储的方法
import { defineStore } from 'pinia'
// 引入登录接口的请求
import {login} from '@/api/auth'

// 引入获取登录信息接口的请求
import {user} from '@/api/auth'

// 定义接口 限制存储的类型结构
export interface IUserState {
	token: string;
	username: string;
	avatar: string;
	permissions: string[];
	info: Object;
}
// 定义存储对象
export const useUserStore = defineStore({
	id: 'app-user',
	state: ():IUserState => ({
		token: localStorage.getItem('token') || '',
		username:'',
		avatar:'',
		permissions:[],
		info:{},
	}),
	// 定义获取存储数据时调用的方法
	getters: {
		getToken(): string {
			return this.token;
		},
		getAvatar(): string {
			return this.avatar;
		},
		getUserName(): string {
			return this.username;
		},
		getPermissions(): string[] {
			return this.permissions;
		},
		async getUserInfo(): Object {
			// 判断 this.info 是否是空对象
			if(!this.info?.id) {
				this.getUser();
			}
			return this.info;
		}
	},
	// 定义修改存储数据时调用的方法
	actions: {
		setToken(token: string) {
			localStorage.setItem('token',token);
			this.token = token;
		},
		setAvatar(avatar: string) {
			this.avatar = avatar;
		},
		setUserInfo(info:Object) {
			this.info = info;
		},
		setUserName(username:string) {
			this.username = username;
		},
		setPermissions(permissions:string[]) {
			this.permissions = permissions;
		},
		// 定义登录异步请求的方法
		async login(userInfo:Object) {
			try {
				const response = await login(userInfo);
				if (response.access_token){
					this.setToken(response.access_token);
					this.getUser();
				}
			} catch (error) {
				console.log(error);
			}
		},
		// 定义获取用户信息的异步请求
		async getUser(){
			console.log('getUser')
			try {
				const response = await user();
				this.setUserInfo(response);
				this.setAvatar(response.avatar);
				this.setUserName(response.name);
				return response;
			} catch (error) {
				console.log(error);
			}
		}
	}
})