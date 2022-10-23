import { httpBase, httpSeperateBaseJson } from "./httpBaseUtil";

export const fetch = (url, params) => {
  return httpBase().get(`/${url}`, params);
};

export const store = (url, data) => {
  return httpBase().post(`/${url}`, data);
};

export const update = (url, data) => {
  return httpBase().put(`/${url}`, data);
};

export const destroy = (url, id = "") => {
  return httpBase().delete(`/${url}/${id}`);
};

// export const storeJson = (url, data) => {
//     return httpSeperateBaseJson().post(`/${url}`, data)
// }
export const seperateStoreJson = (url, data) => {
  return httpSeperateBaseJson().post(`/${url}`, data);
};
