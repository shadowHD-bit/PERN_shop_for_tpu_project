import {$authHost, $host} from "./index";

export const addHistoryView = async (data_history) => {
    const {data} = await $host.post('api/history_view_product', data_history)
    return data
}

export const getHistoryView = async (id) => {
    const {data} = await $host.get('api/history_view_product/' + id)
    return data
}

