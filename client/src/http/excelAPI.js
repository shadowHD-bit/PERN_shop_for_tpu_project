import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

// Выбрать товары
export const fetchProductExcel = async (productTypeId, productBrandId) => {
  const { data } = await $host.get("api/product_excel", {
    params: {
      productTypeId,
      productBrandId,
    },
  });
  return data;
};

// Выбрать заказы
export const fetchOrderExcel = async ({ complete }) => {
  const { data } = await $authHost.get(`api/order_excel?complete=${complete}`);
  return data;
};

// Выбрать бренд
export const fetchBrandExcel = async () => {
  const { data } = await $authHost.get(`api/brand_excel`);
  return data;
};

// Выбрать тип
export const fetchTypeExcel = async () => {
  const { data } = await $authHost.get(`api/type_excel`);
  return data;
};

// Выбрать пользователей
export const fetchUserExcel = async () => {
  const { data } = await $authHost.get(`api/user_excel`);
  return data;
};