import axios from "axios";

//Инстанс для обычных запросов, не требующих авторизации
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

//Инстанс для запросов, требующих авторизации
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}