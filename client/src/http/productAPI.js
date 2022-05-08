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

// Обновление товара
export const updateProduct = async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/product/${id}`, data: body});
    return data;
}


//Работа с корзиной
export const addProductToBasket = async (product) => {
    const {data} = await $authHost.post('api/basket', product);
    return data;
}

export const getProductFromBasket = async () => {
    const {data} = await $authHost.get('api/basket');
    return data;
}

export const deleteProductFromBasket = async (id) => {
    const {data} = await $authHost.delete(`api/basket/${id}`);
    return data;
}

//Поиск товара
export const getAllProductSearch = async (name, page = 1, filter = "All") => {
    const {data} = await $host({method:'GET', url:`api/product/search?page=${page}&name=${name}&filter=${filter}`});
    return data;
}