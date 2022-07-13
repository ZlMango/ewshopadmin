import request from '@/utils/request'


// 封装获取轮播列表接口的请求
export function slides(params:any){
	return request({
		url: '/api/admin/slides',
		params
	})
}


// 封装添加轮播接口的请求
export function addSlides(data:any){
	return request({
		url: '/api/admin/slides',
		method: 'POST',
		data
	})
}








