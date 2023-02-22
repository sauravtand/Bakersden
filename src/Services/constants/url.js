/**
 * @desc: api url
 */
// const API_URL = `https://lunivacare.ddns.net/bakeryProduction/`;
const API_URL = `http://lunivacare.ddns.net/bakeryProductionUAT/`;

/**
 * @desc: api base url with route
 *
 */
// export const BASE_URL = `${API_URL}LunivaproductionApi/`;
// export const BASE_URL = `${API_URL}LunivaproductionApi/`;
export const BASE_URL = `${API_URL}LunivaproductionApi/`;

export const GetItemList = "GetItemList";

/**
 * @desc: get list of items
 *
 */

export const InsertUpdateDayWiseProductionDetails =
  "InsertUpdateDayWiseProductionDetails";

/**
 * @desc: Insert Update Daywise Production Details
 * @param: {
      "PId": 1,
      "ItemId": 2,
      "Quantity": 3.1,
      "Remarks": "sample string 4",
      "UserId": 5,
      "EntryDate": "2022-06-27T16:13:02.4627963+05:45",
      "IsActive": true
      }
 */

export const GetProductionDetailsByDate = `GetProductionDetailsByDate`;

/**
 * @desc: Get production Details By Date
 * @param: ?fromdate={fromdate}&todate={todate}
 */

export const UpdateDeliveryChalan = `UpdateDeliveryChalan`;

/**
 * @desc: Update Delivery Chalan
 * @param: {
          "DCId": 1,
          "PartyId": 2,
          "PartyName": "sample string 3",
          "PartyAddress": "sample string 4",
          "UserId": 5,
          "EntryDate": "2022-06-27T16:13:00.0776592+05:45",
          "DeliveryDate": "2022-06-27T16:13:00.0776592+05:45",
          "Remarks": "sample string 8",
          "IssuedBy": 9,
          "ReceivedBy": 10,
          "ApprovedBy": 11,
          "IsActive": true
          }
 */
export const UpdateChalanItems = `UpdateChalanItems`;
/**
 * @desc: Update Chalan Items
 * @param:{
  "CId": 1,
  "ChalaniNo": 2,
  "ItemId": 3,
  "Quantity": 4.1,
  "Remarks": "sample string 5",
  "IsActive": true
}
 * 
 * 
 */

export const InsertChalanWithItemDetails = "InsertChalanWithItemDetails";
/**
 * @desc: Insert Chalani With Item Details.
 * @param:{
  "_Chalan": {
    "DCId": 1,
    "PartyId": 2,
    "PartyName": "sample string 3",
    "PartyAddress": "sample string 4",
    "UserId": 5,
    "EntryDate": "2022-07-06T11:27:55.5756515+05:45",
    "DeliveryDate": "2022-07-06T11:27:55.5756515+05:45",
    "Remarks": "sample string 8",
    "IssuedBy": 9,
    "ReceivedBy": 10,
    "ApprovedBy": 11,
    "IsActive": true
  },
  "_chalanItemDetails": [
    {
      "CId": 1,
      "ChalaniNo": 2,
      "ItemId": 3,
      "Quantity": 4.1,
      "Remarks": "sample string 5",
      "IsActive": true
    }
  ]
}

 */
export const InsertChalanDetailsWithSeparateItemsDetails = `InsertChalanDetailsWithSeparateItemsDetails`;
/**
 * @desc: Insert ChalanDetails With Separate Items Details
 *  @param:{
  "
    "DCId": 1,
    "PartyId": 2,
    "PartyName": "sample string 3",
    "PartyAddress": "sample string 4",
    "UserId": 5,
    "EntryDate": "2022-07-06T11:27:55.5756515+05:45",
    "DeliveryDate": "2022-07-06T11:27:55.5756515+05:45",
    "Remarks": "sample string 8",
    "IssuedBy": 9,
    "ReceivedBy": 10,
    "ApprovedBy": 11,
    "IsActive": true
  }
 */

// GetChalanDetailsByDate?fromdate={fromdate}&todate={todate}

export const GetChalanDetailsByDate = `GetChalanDetailsByDate`;

/**
 * @desc: Get chaalani Details By Date
 *  @param: ?fromdate={fromdate}&todate={todate}
 */

// GetChalanItemDetailsByChalanId?chalanNo={chalanNo}

export const GetChalanItemDetailsByChalanId = `GetChalanItemDetailsByChalanId`;

/**
 * @desc: Get chaalani Details By chalani Id
 *  @param: ?chalanNo={chalanNo}
 */

// GetRemainingProductionGoodsByDate?fromdate={fromdate}&todate={todate}
export const GetRemainingProductionGoodsByDate = `GetRemainingProductionGoodsByDate`;

/**
 * @desc: Get remaninging production goods by date
 * @param: ?fromdate={fromdate}&todate={todate}
 */

// GetAvailableCountofProductForChalani?itemId={itemId}&prodDate={prodDate}

export const GetAvailableCountofProductForChalani = `GetAvailableCountofProductForChalani`;

/**
 * @desc: Get abailable count of product for chalanai
 * @param: ?itemId={itemId}&prodDate={prodDate}
 */

export const GetBranchList = `GetBranchList`;

/**
 * @desc: Get Branch List
 */

export const CheckValidLogin = `CheckValidLogin`;

/**
 * @desc: Check login credentials
 */

export const ApproveDeliveryChalan = "ApproveDeliveryChalan";
/**
 * @desc: Approve Chalan
 */

export const ReceiveDeliveryChalan = "ReceiveDeliveryChalan";
/**
 * @desc: Receive Chalan
 */

export const InsertUpdateItemDetails = "InsertUpdateItemDetails";
/**
 * @desc: Insert Update Item Detai
 *  @param:{
  "
  {
  "itmID": 1,
  "itmCode": "sample string 2",
  "itmName": "sample string 3",
  "itmDateAdded": "2023-02-05T10:35:43.4903733+05:45",
  "Units": "sample string 5"
}
  }
 */

export const InsertUpdateUserDetails = "InsertUpdateUserDetails";
/**
 * @desc: Insert Update Item Detai
 *  @param:{
  "
  
{
  "Id": 1,
  "UserName": "sample string 2",
  "UserPassword": "sample string 3",
  "IsActive": true,
  "UserRole": "sample string 5"
}  
 */

export const UpdateOpeningStockOfItems = `UpdateOpeningStockOfItems`;
/**
 * @params{
 * id,date
 * }
 */

export const GetListOfUsers = `GetListOfUsers`;
/**
 * @desc: Get User List
 */
export const GetLastClosingDate = "GetLastClosingDate";

export const GetDayWiseProductionStockDetails = `GetDayWiseProductionStockDetails`;
/**
 * @desc: Get User List
 */
