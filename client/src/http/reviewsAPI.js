import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//Создать review
export const createReviews = async (reviews) => {
    const {data} = await $authHost.post('api/reviews', reviews)
    return data
}

// Выбрать review по товару
export const fetchReviewsProduct = async ({id}) => {
    const {data} = await $host.get('api/reviews/' + id)
    return data
}

export const deleteReviewsProduct = async (id) => {
    const {data} = await $host.delete('api/reviews/' + id)
    return data
}

// Выбрать all review
export const fetchReviews = async () => {
    const {data} = await $host.get('api/reviews/')
    return data
}