import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";


export const fetchOneCoupon = async (code) => {
    const {data} = await $host.get(`api/coupon/check_coupon/${code}`)
    return data
}