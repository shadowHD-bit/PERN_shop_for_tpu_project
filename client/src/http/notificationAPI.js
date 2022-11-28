import {$authHost, $host} from "./index";

export const fetchNotificationOneUser = async (id) => {
    const {data} = await $host.get('api/notification/'+id)
    return data
}

export const deleteNotification = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/notification/'+id});
    return data;
}

export const createNotification = async (notification) => {
    const {data} = await $authHost.post('api/notification', notification)
    return data
}