import axios, { AxiosResponse } from 'axios';
const v4_SHEETS_API = `https://sheets.googleapis.com/v4/spreadsheets`;
const V1_REPORTS_API = `https://www.googleapis.com/admin/reports/v1/activity/users/deepaky193@gmail.com/applications/login`;

export default class GoogleAPIService {
  config: any;

  constructor(accessToken: string) {
    this.config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
  }

  getSheetData = ({
    spreadSheetId,
    sheetId
  }: {
    spreadSheetId: string;
    sheetId: string;
  }) => {
    return axios.get(
      `${v4_SHEETS_API}/${spreadSheetId}/values/${sheetId}`,
      this.config
    );
  };

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
  API_KEY: string | undefined;

  constructor(apiKey: string | undefined) {
    this.API_KEY = apiKey;
  }

  getWeather = (inputs: WeatherInput) => {
    return axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputs.city},${
        inputs.state ?? ''
      },${inputs.country ?? ''}&appid=${this.API_KEY}&units=metric`
    );
  };
}

export const restCall = async (fnCall: () => Promise<AxiosResponse>) => {
  try {
    const response = await fnCall();
    return [response, null];
  } catch (err) {
    console.error(`API call ERROR\n`, err);
    return [null, err];
  }
};
