import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//Создать ответ
export const createAnswer= async (answer) => {
    const {data} = await $authHost.post('api/answer', answer)
    return data
}

// Выбрать один ответ
export const fetchOneAnswer = async (id) => {
    const {data} = await $host.get('api/answer/' + id)
    return data
}

// Обновить один ответ
export const updateAnswerText = async (answer) => {
    const {data} = await $authHost({method:'PUT', url:`api/answer`, data: answer})
    return data
}

