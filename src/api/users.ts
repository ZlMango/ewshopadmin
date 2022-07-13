
import request from '@/utils/request'

// 封装用户列表接口的请求
export function users(params:any){
	return request({
		url: '/api/admin/users',
		params
	})
}

// 封装添加用户接口的请求
export function addUser(data:any){
	return request({
		url: '/api/admin/users',
		method: 'POST',
		data
	})
}


// 封装用户详情接口的请求
export function getUserInfo(userid:number){
	return request({
		url: `/api/admin/users/${userid}`,
	})
}


// 封装更新用户信息接口的请求
export function updateUser(userid:number,data:any){
	return request({
		url: `/api/admin/users/${userid}`,
		method: 'PUT',
		data
	})
}


