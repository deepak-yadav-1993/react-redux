import axios from "axios";
import { ApiKey, clientId, sheetsID } from "./GoogleAuthCreds";

const baseSpreadsheetUrl = `https://spreadsheets.google.com/feeds/spreadsheets/private/`;
const v4API = `https://sheets.googleapis.com/v4/spreadsheets`;
const tokenPrefix = `/full?access_token=`;
const API_KEY = `key=${ApiKey}`;
const baseWorksheetUrl = `https://spreadsheets.google.com/feeds/cells/key/worksheetId/private/`;
interface errorInterface {
   customMessage: string,
   code: number,
   message: string,
   status: string,
}
const ERROR_FUNCTION = (error: errorInterface) => {
   console.log(`${error?.customMessage}\nError code ${error?.code} -> ${error?.message}`);
   return;
}

export default class ApiService {
   config: object;

   constructor(accesToken: string) {
      this.config = {
         headers: {
            'Authorization': `Bearer ${accesToken}`
         }
      };
   }

   /**
    * 
    * @param {string} spreadsheetId - Id of the spppreadsheet that you want
    * @param {string} sheetId - The title of the sheet in the spreadsheet
    * @example 
    * let sheetObject = {spreadsheetId: "id", sheetId: "sheetid"};
    * getSheetData(sheetObject);
    */
   getSheetData = async ({spreadsheetId, sheetId}: {spreadsheetId:string, sheetId: string})  => {
      try {
         const sheet = await axios.get(`${v4API}/${spreadsheetId}/values/${sheetId}`, this.config);
         return sheet?.data?.values ?? [];
      }
      catch (err) {
         const { error } = err?.response?.data; 
         ERROR_FUNCTION({ customMessage: "Error while getting the sheet by id", ...error });
         return [];
      }
   }
};