import axios from "axios";
// import { ApiKey, clientId, sheetsID } from "./GoogleAuthCreds";

// const baseSpreadsheetUrl = `https://spreadsheets.google.com/feeds/spreadsheets/private/`;
const v4_SHEETS_API = `https://sheets.googleapis.com/v4/spreadsheets`;
const V1_REPORTS_API = `https://www.googleapis.com/admin/reports/v1/activity/users/deepaky193@gmail.com/applications/login`;
// const tokenPrefix = `/full?access_token=`;
// const API_KEY = `key=${ApiKey}`;
// const baseWorksheetUrl = `https://spreadsheets.google.com/feeds/cells/key/worksheetId/private/`;

export default class GoogleAPIService {
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
		return axios.get(
			`${v4_SHEETS_API}/${speadSheetId}/values/${sheetId}`,
			this.config
		);
	};

	/**
	 * @param {number} maxResults - Max number of results per page. Defaulted to 25
	 */
	getLoginHistory = ({ maxResults = 25 }: { maxResults: number }) => {
		return axios.get(`${V1_REPORTS_API}?maxResults=${maxResults}`, this.config);
	};
}

type WeatherInput = {
	city: string;
	state?: string;
	country?: string;
};
export class WeatherApi {
	API_KEY: string;

	constructor(apiKey: any) {
		this.API_KEY = apiKey;
	}

	getWeather = (inputs: WeatherInput) => {
		return axios.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${inputs.city},${
				inputs.state ?? ""
			},${inputs.country ?? ""}&appid=${this.API_KEY}&units=metric`
		);
	};
}

export const restCall = async (call: any, params: any) => {
	try {
		const response = await call(params);
		return [response, null];
	} catch (err) {
		console.error(`API call ERROR`, err);
		return [null, err];
	}
};
