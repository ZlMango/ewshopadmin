import request from '@/utils/request'


// ๅๅๅ่กจ
export function goodList(params:any){
	return request({
		url: '/api/admin/goods',
		params
	})
}














