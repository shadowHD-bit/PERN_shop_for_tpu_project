import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//Создать вопрос
export const createQuestion= async (question) => {
    const {data} = await $authHost.post('api/question', question)
    return data
}

// Удалить аопрос
export const deleteQuestion = async ({id}) => {
    const {data} = await $authHost.delete('api/question/'+id);
    return data;
}
// Выбрать вопрос
export const fetchQuestion = async ({limit, page, complete}) => {
    const {data} = await $host.get(`api/question?limit=${limit}&page=${page}&complete=${complete}`)
    return data
}

// Выбрать вопросы по товару
export const fetchQuestionProduct = async ({id}) => {
    const {data} = await $host.get('api/question/' + id)
    return data
}

export const changeStatusQuestion = async ({complete_question, id_question}) => {
    const {data} = await $authHost.put('api/question', {complete_question, id_question});
    return data;
}

export const getBoolUserUnCompleteQuestion= async ({id, product_id}) => {
    const {data} = await $authHost.post(`api/question_user/user_check_question?id=${id}&product_id=${product_id}`);
    return data;
}