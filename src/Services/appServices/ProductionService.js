import {
  ApproveDeliveryChalan,
  GetAvailableCountofProductForChalani,
  GetBranchList,
  GetChalanDetailsByDate,
  GetChalanItemDetailsByChalanId,
  GetItemList,
  GetProductionDetailsByDate,
  GetRemainingProductionGoodsByDate,
  InsertChalanDetailsWithSeparateItemsDetails,
  InsertUpdateDayWiseProductionDetails,
  ReceiveDeliveryChalan,
  UpdateChalanItems,
  UpdateDeliveryChalan,
  InsertUpdateItemDetails,
  InsertUpdateUserDetails,
  GetListOfUsers,
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
    // console.log("fgf", data);
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

// GetRemainingProductionGoodsByDate

export const GetRemainingProductionGoodsByDatee = async (
  data,
  successCallback
) => {
  try {
    const response = await fetch(
      `${GetRemainingProductionGoodsByDate}?fromdate=${data.fromdate}&todate=${data.todate}`
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

// GetAvailableCountofProductForChalani
export const GetAvailableCountofProductForChalanis = async (
  data,
  successCallback
) => {
  try {
    const response = await fetch(
      `${GetAvailableCountofProductForChalani}?itemId=${data.id}&prodDate=${data.fromdate}`
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

// GetItemList

export const GetItemLists = async (successCallback) => {
  try {
    const response = await fetch(`${GetItemList}`);
    if (response?.status === 200) {
      successCallback(response?.data);
    } else {
      successCallback([]);
    }
  } catch (error) {
    successCallback([]);
  }
};

// GetBranchList
export const GetBranchLists = async (successCallback) => {
  try {
    const response = await fetch(`${GetBranchList}`);
    if (response?.status === 200) {
      successCallback(response?.data);
    } else {
      successCallback([]);
    }
  } catch (error) {
    successCallback([]);
  }
};

// Approve Chalan entry

export const ApproveDeliveryChalani = async (data, successCallback) => {
  try {
    const response = await store(
      `${ApproveDeliveryChalan}?chalanId=${data.chalanId}&userId=${data.userId}`
    );
    if (response?.status === 200) {
      successCallback(response?.data);
      console.log(response?.data, "response.data");
    } else {
      successCallback([]);
    }
  } catch (error) {
    successCallback([]);
  }
};

// Receive Chalan Entry

export const ReceiveDeliveryChalani = async (data, successCallback) => {
  try {
    const response = await store(
      `${ReceiveDeliveryChalan}?chalanId=${data.chalanId}&userId=${data.userId}`
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

export const InsertUpdateItemDetail = async (data, successCallback) => {
  let formData = generateUrlEncodedData(data);
  // return
  try {
    const response = await store(`${InsertUpdateItemDetails}`, formData);
    if (response?.status === 200) {
      successCallback(response?.data);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};

export const GetListOfUser = async (successCallback) => {
  try {
    const response = await fetch(`${GetListOfUsers}`);
    if (response?.status === 200) {
      successCallback(response?.data);
    } else {
      successCallback([]);
    }
  } catch (error) {
    successCallback([]);
  }
};

export const InsertUpdateUserDetail = async (data, successCallback) => {
  let formData = generateUrlEncodedData(data);
  // return
  try {
    const response = await store(`${InsertUpdateUserDetails}`, formData);
    if (response?.status === 200) {
      successCallback(response?.data);
    } else successCallback([]);
  } catch (error) {
    successCallback([]);
  }
};
