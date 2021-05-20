import axios from "axios";
// import { ApiKey, clientId, sheetsID } from "./GoogleAuthCreds";

// const baseSpreadsheetUrl = `https://spreadsheets.google.com/feeds/spreadsheets/private/`;
const v4API = `https://sheets.googleapis.com/v4/spreadsheets`;
// const tokenPrefix = `/full?access_token=`;
// const API_KEY = `key=${ApiKey}`;
// const baseWorksheetUrl = `https://spreadsheets.google.com/feeds/cells/key/worksheetId/private/`;

export default class ApiService {
	config: object;

	constructor(accesToken: string) {
		this.config = {
			headers: {
				Authorization: `Bearer ${accesToken}`,
			},
		};
	}

	/**
	 *
	 * @param {string} speadSheetId - Id of the spppreadsheet that you want
	 * @param {string} sheetId - The title of the sheet in the spreadsheet
	 * @example
	 * let sheetObject = {speadSheetId: "id", sheetId: "sheetid"};
	 * getSheetData(sheetObject);
	 */
	getSheetData = ({
		speadSheetId,
		sheetId,
	}: {
		speadSheetId: string;
		sheetId: string;
	}) => {
		return axios.get(`${v4API}/${speadSheetId}/values/${sheetId}`, this.config);
	};
}
