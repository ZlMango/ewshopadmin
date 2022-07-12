
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

