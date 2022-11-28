import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";


export const createRules = async (rules) => {
    const {data} = await $authHost.post('api/rules', rules)
    return data
}

export const fetchRules = async () => {
    const {data} = await $host.get('api/rules')
    return data
}

export const fetchOneRules = async (id) => {
    const {data} = await $host.get('api/rules/'+id)
    return data
}

export const updateRules = async (rules) => {
    const {data} = await $authHost({method:'PUT', url:`api/rules`, data: rules})
    return data
}


export const deleteRules = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/rules/'+id});
    return data;
}