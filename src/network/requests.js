import axios from 'axios'

function requests(config) {

    const instance = axios.create({
        baseURL: 'http://192.168.10.129:5000/api',
        // timeout: 15000
    })

    instance.interceptors.request.use(config => {
        // do something
        // console.log('请求拦截器')
        return config
    }, error => {
        console.log(error)
    })

    instance.interceptors.response.use(res => {
        // do something
        // 例如 res.data 里是服务器里返回的用户关心的数据  排除掉框架附加的数据
        // console.log('响应拦截器')
        return res.data
    }, error => {
        console.log(error)
    })

    return instance(config)

}


export {requests}