//location
import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createLocationApi = async (location) => {
  const { data } = await $authHost.post("api/location", location);
  return data;
};

export const fetchLocations = async () => {
  const { data } = await $host.get("api/location");
  return data;
};

export const fetchOneLocations = async (id) => {
    const { data } = await $host.get("api/location/"+id);
    return data;
  };

export const deleteLocationsApi = async (id) => {
  const { data } = await $authHost({
    method: "DELETE",
    url: "api/location/" + id,
  });
  return data;
};

export const updateLocation = async (id, location) => {
  const { data } = await $authHost({
    method: "PUT",
    url: `api/location/${id}`,
    data: location,
  });
  return data;
};
