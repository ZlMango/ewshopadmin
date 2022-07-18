import request from '@/utils/request'


// 商品列表
export function goodList(params:any){
	return request({
		url: '/api/admin/goods',
		params
	})
}














