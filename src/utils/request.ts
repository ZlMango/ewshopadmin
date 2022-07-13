// 1. 导入axios依赖包
import axios from 'axios'

// 2. 创建axios实例对象
const request = axios.create({
	// 管理后台要使用的接口的基础地址
	baseURL:'https://api.shop.eduwork.cn/',
	// 超时时间
	timeout: 8000
})


// 3. 定义请求拦截器 前置拦截器 请求发送出去之前触发
request.interceptors.request.use((config) => {
	// 获取 token
	const token = localStorage.getItem('token') || ''
	// 判断 token 是否存在
	if (token){
		// 如果 token 存在   添加到请求头的参数中  带着 token 一起去访问接口
		config.headers.Authorization = `Bearer ${token}`;
	}
	// config 接口请求的配置信息
	return config;
},error => {
	// 出现请求错误时抛出错误信息
	return Promise.reject(error)
})
// 4. 定义响应拦截器 后置拦截器 服务器的响应数据回来之前触发
request.interceptors.response.use(response => {
	// 返回从服务器获取的数据
	return response.data
},error => {
	// 解构从服务器返回的错误信息中的response
	const {response} = error
	console.log(response)
	// 判断响应的错误信息的状态码
	switch (response.status) {
		// 	（未授权）请求要求身份验证。
		case 401:
			window.$message.error('登录失效，请重新登录')
			// 清除本地token
			localStorage.removeItem('token')
			// 设置延迟
			setTimeout(() => {
				// 设置页面重定向
				window.location.href = '/login'
			},500)
			break;
		// （未找到） 服务器找不到请求的资源
		case 404:
			window.$message.error('请求页面不存在')
			break;
		//（服务器内部错误） 服务器遇到错误，无法完成请求。  通常是api出现了错误  后台的问题
		case 500:
		//（错误网关） 服务器作为网关或代理，从上游服务器收到无效响应。
		case 502:
			window.$message.error('网络异常')
			break;
		// （验证错误） 请求参数未通过验证
		case 422:
			console.log(response)
			let msg = response.data.errors[Object.keys(response.data.errors)[0]][0]
			window.$message.error(msg)
			break;
	}
	//返回错误的响应信息
	return Promise.reject(error)
})
// 抛出axios实例对象的信息
export default request


/*
	不同的请求方式

	get /api/admin/users  获取用户列表
	get /api/admin/users:id  获取用户详情
	post /api/admin/users  添加用户
	put /api/admin/users:id  修改用户
	delete /api/admin/users:id  删除用户
*/



















