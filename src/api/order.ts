import request from '@/utils/request'


//订单列表
export function orderList(data: any){
	return request({
		url: '/api/admin/orders',
		data
	})
}







