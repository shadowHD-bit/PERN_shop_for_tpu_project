import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//Создать review
export const createReviews = async (reviews) => {
    const {data} = await $authHost.post('api/reviews', reviews)
    return data
}

// Выбрать вопросы по товару
export const fetchReviewsProduct = async ({id}) => {
    const {data} = await $host.get('api/reviews/' + id)
    return data
}