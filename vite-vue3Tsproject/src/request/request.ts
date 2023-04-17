import axios,{ InternalAxiosRequestConfig,AxiosResponse} from "axios"

// 请求拦截
axios.interceptors.request.use((config:  InternalAxiosRequestConfig) => {
    return config
})
// 响应拦截
axios.interceptors.response.use((response: AxiosResponse<any>) => {
    return response
}, error => {
    // 错误提醒
    return Promise.reject(error);
})

export default axios