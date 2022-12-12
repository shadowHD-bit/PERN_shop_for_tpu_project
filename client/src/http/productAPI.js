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
    const {data} = await $authHost({method:'DELETE', url:'api/productBrand/'+id});
    return data;
}

// Update бренд
export const updateBrand= async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/productBrand/${id}`, data: body});
    return data;
}

// Update type
export const updateType= async (id, body) => {
    const {data} = await $authHost({method:'PUT', url:`api/productType/${id}`, data: body});
    return data;
}


// Создать товар
export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product)
    return data
}

// Создать товар excel
export const createMoreProduct = async (products) => {
    const {data} = await $authHost.post('api/product_excel', products)
    return data
}

// Выбрать товар
export const fetchProduct = async (productTypeId, productBrandId) => {
    const {data} = await $host.get('api/product', {params: {
        productTypeId, productBrandId
        }})
    return data
}

// Выбрать товар
export const fetchProductsForAdmin = async () => {
    const {data} = await $authHost.get(`api/display_product`);
    return data;
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

// Обновление отображения
export const updateDisplayProduct = async ({display, id}) => {
    const {data} = await $authHost.put('api/display_product', {display, id});
    return data;
}

//Работа с корзиной
export const addProductToBasket = async (product) => {
    const {data} = await $authHost.post('api/basket', product);
    return data;
}

//Работа с корзиной
export const changeCountProductBasket = async (data_action) => {
    const {data} = await $authHost.post('api/basket/change_count', data_action);
    return data;
}

export const getProductFromBasket = async () => {
    const {data} = await $authHost.get('api/basket');
    return data;
}

export const deleteProductFromBasket = async (id, size_product) => {
    const {data} = await $authHost({method: "DELETE", url: `api/basket/${id}`, data: size_product});
    return data;
}

//Поиск товара
export const getAllProductSearch = async (name) => {
    const {data} = await $host({method:'GET', url:`api/product/search/${name}`});
    return data;
}

// Удалить бренд 
export const deleteInfo = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/info_product/'+id});
    return data;
}


//Создать размер
export const createSize = async (size) => {
    const {data} = await $authHost.post('api/sizes', size)
    return data
}

export const fetchSizes = async () => {
    const {data} = await $host.get('api/sizes')
    return data
}

export const fetchSizesOneProduct = async (id) => {
    const {data} = await $host.get('api/sizes/'+id)
    return data
}

export const deleteSizeApi = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/sizes/'+id});
    return data;
}

export const createProductSize = async (size) => {
    const {data} = await $authHost.post('api/product_sizes', size)
    return data
}

export const deleteProductSizeApi = async (size) => {
    const {data} = await $authHost({method:'DELETE', url:'api/product_sizes/', data: size});
    return data;
}


export const createBadge = async (size) => {
    const {data} = await $authHost.post('api/badges', size)
    return data
}

export const fetchBadge = async () => {
    const {data} = await $host.get('api/badges')
    return data
}

export const deleteBadge = async (id) => {
    const {data} = await $authHost({method:'DELETE', url:'api/badges/'+id});
    return data;
}