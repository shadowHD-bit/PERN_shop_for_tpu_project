import { $authHost, $host } from "./index";

export const sendOrder = async ({ auth, basket }) => {
  if (auth) {
    const { data } = await $authHost({
      method: "POST",
      url: "api/order",
      data: { basket },
    });
    return data;
  } else {
    const { data } = await $host({
      method: "POST",
      url: "api/order",
      data: { basket },
    });
    return data;
  }
};

export const fetchOrders = async ({ limit, page, complete }) => {
  const { data } = await $authHost.get(
    `api/order?limit=${limit}&page=${page}&complete=${complete}`
  );
  return data;
};

export const fetchOrdersUser = async ({ userId, limit, page, complete }) => {
  const { data } = await $authHost.get(
    `api/orderuser?userId=${userId}&limit=${limit}&page=${page}&complete=${complete}`
  );
  return data;
};

export const fetchOrderFromStatistic = async () => {
  const { data } = await $authHost.get(`api/statistic/statistic_order/count_in_months`);
  return data;
};

export const fetchChangeStatusOrder = async ({ complete, id }) => {
  const { data } = await $authHost.put("api/order", { complete, id });
  return data;
};

export const fetchDeleteOrder = async ({ id }) => {
  const { data } = await $authHost.delete("api/order/" + id);
  return data;
};

export const getOneOrderProducts = async (id) => {
  const { data } = await $authHost.get("api/order/" + id);
  return data;
};
//order_product_user
export const getAllProductsOneUser = async ({
  userId,
  limit,
  page,
  complete,
}) => {
  const { data } = await $authHost.get(
    `api/orderuser?userId=${userId}&limit=${limit}&page=${page}&complete=${complete}`
  );
  return data;
};
