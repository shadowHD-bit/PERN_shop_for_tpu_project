import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, name, family, date_birthday, numberPhone,) => {
    const {data} = await $host.post('api/user/registration', {email, password, name, family, date_birthday, numberPhone, role: 'USER'})//email, password, name, family, date_birthday, numberPhone, role
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const checkAuth = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

// /getdatauser

export const getData = async (userID) => {
    const {data} = await $authHost.get(`api/user/${userID}` )
    const resData = await data.rows
    return resData
}