/**
 * @desc: api url
 */
const API_URL = `https://lunivacare.ddns.net/bakeryProduction/`

/**
 * @desc: api base url with route
 * 
 */
export const BASE_URL = `${API_URL}LunivaproductionApi/`

export const GetItemList = 'GetItemList'

/**
 * @desc: get list of items
 * 
 */

export const InsertUpdateDayWiseProductionDetails = 'InsertUpdateDayWiseProductionDetails'

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

export const GetProductionDetailsByDate = `GetProductionDetailsByDate`

/**
 * @desc: Get production Details By Date
 * @param: ?fromdate={fromdate}&todate={todate}
 */

export const UpdateDeliveryChalan = `UpdateDeliveryChalan`

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