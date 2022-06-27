import { InsertUpdateDayWiseProductionDetails } from "../constants/url";
import { GenerateUrlEncodedData } from "../Helpers/GenerateUrlEncodedData";
import { fetch, store } from "../Helpers/HttpUtil";

export const InsertUpdateDayWiseProductionDetail = async (data, successCallback) => {
    try {
        const response = await fetch(`${InsertUpdateDayWiseProductionDetails}`, data);
        if (response?.status === 200) {
            console.log('sucessfull')
        } else
            console.log('error')
    } catch (error) {
        successCallback([])
    }
}