import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/productType', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/productType')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/productBrand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/productBrand', )
    return data
}

export const createProduct = async (device) => {
    const {data} = await $authHost.post('api/product', device)
    return data
}

export const fetchProduct = async (typeId, brandId, page, limit= 5) => {
    const {data} = await $host.get('api/product', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}