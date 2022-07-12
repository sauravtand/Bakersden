import {
  GetChalanDetailsByDate,
  GetChalanItemDetailsByChalanId,
  GetProductionDetailsByDate,
  InsertChalanDetailsWithSeparateItemsDetails,
  InsertChalanWithItemDetails,
  InsertUpdateDayWiseProductionDetails,
  UpdateChalanItems,
  UpdateDeliveryChalan,
} from "../constants/url";
// import { GenerateUrlEncodedData } from "../Helpers/GenerateUrlEncodedData";
// import { fetch, store } from "../Helpers/HttpUtil";
import { generateUrlEncodedData } from "../utils/generateUrlEncodedData";
import { fetch, seperateStoreJson, store, storeJson } from "../utils/httpUtil";

export const InsertUpdateDayWiseProductionDetail = async (
  data,
  successCallback
) => {
  let formData = generateUrlEncodedData(data);
  // return
  try {
    const response = await store(
      `${InsertUpdateDayWiseProductionDetails}`,
      formData
    );
    if (response?.status === 200) {
      successCallback(response?.data);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};

export const GetProductionDetailsDate = async (data, successCallback) => {
  try {
    const response = await fetch(
      `${GetProductionDetailsByDate}?fromdate=${data.fromdate}&todate=${data.todate}`
    );
    if (response?.status === 200) {
      successCallback(response?.data);
    } else {
      successCallback([]);
    }
  } catch (errror) {
    successCallback([]);
  }
};

// export const InsertChalanWithItemDetail = async (data, successCallback) => {
//     console.log('new');
//     try {
//         console.log('fgf', data);
//         const response = await storeJson(`${InsertChalanWithItemDetails}`,data)
//         if (response?.status === 200) {
//             successCallback(response?.data)
//         } else {
//             successCallback([])
//         }
//     } catch (error) {
//         successCallback([])
//     }
// }
export const InsertChalanDetailsWithSeparateItemsDetail = async (
  data,
  successCallback
) => {
  try {
    console.log("fgf", data);
    const response = await seperateStoreJson(
      `${InsertChalanDetailsWithSeparateItemsDetails}`,
      data
    );
    if (response?.status === 200) {
      successCallback(response?.data);
    } else {
      successCallback([]);
    }
  } catch (error) {
    successCallback([]);
  }
};
export const UpdateDeliveryChalani = async (data, successCallback) => {
  try {
    const response = await store(`${UpdateDeliveryChalan}`, data);
    if (response?.status === 200) {
      successCallback(response?.data);
    } else {
      successCallback([]);
    }
  } catch (error) {
    successCallback([]);
  }
};
export const UpdateChalanItem = async (data, successCallback) => {
  try {
    const response = await store(`${UpdateChalanItems}`, data);
    if (response?.status === 200) {
      successCallback(response?.data);
    } else {
      successCallback([]);
    }
  } catch (error) {
    successCallback([]);
  }
};

export const GetChalanDetailByDate = async (data, successCallback) => {
  try {
    const response = await fetch(
      `${GetChalanDetailsByDate}?fromdate=${data.fromdate}&todate=${data.todate}`
    );
    if (response?.status === 200) {
      successCallback(response?.data);
    } else {
      successCallback([]);
    }
  } catch (error) {
    successCallback([]);
  }
};

export const GetChalanItemDetailsByChalansId = async (
  data,
  successCallback
) => {
  try {
    const response = await fetch(
      `${GetChalanItemDetailsByChalanId}?chalanNo=${data}`
    );
    if (response?.status === 200) {
      successCallback(response?.data);
    } else {
      successCallback([]);
    }
  } catch (error) {
    successCallback([]);
  }
};
