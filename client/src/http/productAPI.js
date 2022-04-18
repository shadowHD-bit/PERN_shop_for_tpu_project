import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//Создать тип
export const createType = async (type) => {
    const {data} = await $authHost.post('api/productType', type)
    return data
}

// Удалить тип
export const deleteType = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/productType/'+id});
    return data;
}

// Выбрать тип
export const fetchTypes = async () => {
    const {data} = await $host.get('api/productType')
    return data
}

// Создать бренд
export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/productBrand', brand)
    return data
}

// Выбрать бренд
export const fetchBrands = async () => {
    const {data} = await $host.get('api/productBrand', )
    return data
}

// Удалить бренд
export const deleteBrand = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/brand/'+id});
    return data;
}

// Создать товар
export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product)
    return data
}

// Выбрать товар
export const fetchProduct = async (productTypeId, productBrandId, page, limit= 5) => {
    const {data} = await $host.get('api/product', {params: {
        productTypeId, productBrandId, page, limit
        }})
    return data
}

// Выбрать один продукт
export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}

// Удалить один продукт
export const fetchDeleteProduct = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:`api/product/${id}`});
    return data;
}