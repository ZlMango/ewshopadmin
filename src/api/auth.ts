// 将项目所使用的api放到此文件中

// 将封装的 axios 实例对象的信息引入
import request from '@/utils/request'


// 封装登录接口的请求
export function login(data:object){
	return request({
		url: '/api/auth/login',
		method: 'POST',
		data
	})
}

// 封装获取登录信息接口的请求
export function user(){
	return request({
		url: '/api/admin/user'
	})
}


// 封装退出登录接口的请求
export function logout(){
	return request(
		{
			url: '/api/admin/logout',
			method: 'POST',
		}
	)
}
