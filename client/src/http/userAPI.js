import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (
  email,
  password,
  name,
  family,
  date_birthday,
  numberPhone,
  gender,
  allowSpam
) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    name,
    family,
    date_birthday,
    numberPhone,
    gender,
    allowSpam,
    role: "USER",
  }); 
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};


export const social_VK_auth = async (
    email,
    password,
    name,
    family,
    date_birthday,
    numberPhone,
    gender,
    allowSpam,
    id_social,
    img_user,
  ) => {
    const { data } = await $host.post("api/social_vk/social_auth", {
      email,
      password,
      name,
      family,
      date_birthday,
      numberPhone,
      gender,
      allowSpam,
      id_social,
      img_user,
      role: "USER",
    }); //email, password, name, family, date_birthday, numberPhone, role
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
  };

  export const social_Google_auth = async (
    email,
    password,
    name,
    family,
    allowSpam,
    id_social,
    img_user,
  ) => {
    const { data } = await $host.post("api/social_google/social_auth", {
      email,
      password,
      name,
      family,
      allowSpam,
      id_social,
      img_user,
      role: "USER",
    }); //email, password, name, family, date_birthday, numberPhone, role
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
  };

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const checkAuth = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

// /getdatauser

export const getData = async (userID) => {
  const { data } = await $authHost.get(`api/user/${userID}`);
  return data;
};

export const getUserRoleAdminApi = async () => {
  const { data } = await $authHost.get(`api/user/admin_user`);
  return data;
};

export const getNewUserApi = async () => {
  const { data } = await $authHost.get(`api/user/new_user`);
  return data;
};

export const getMoneyUserApi = async () => {
  const { data } = await $authHost.get(`api/user/money_user`);
  return data;
};

export const updateUserData = async (id, body) => {
  const {data} = await $authHost({method:'PUT', url:`api/user/${id}`, data: body});
  return data;
}
export const fetchUserFromStatistic = async () => {
  const { data } = await $authHost.get(`api/statistic/statistic_user/count_in_months`);
  return data;
};