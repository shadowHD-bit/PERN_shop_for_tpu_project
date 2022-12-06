import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const fetchOneCoupon = async (code) => {
  const { data } = await $host.get(`api/coupon/check_coupon/${code}`);
  return data;
};

export const fetchCoupons = async () => {
  const { data } = await $host.get(`api/coupon`);
  return data;
};

export const createCoupon = async (coupon) => {
  const { data } = await $authHost.post(`api/coupon`, coupon);
  return data;
};

export const deleteCoupon = async (id) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: "api/coupon/" + id,
  });
  return data;
};
