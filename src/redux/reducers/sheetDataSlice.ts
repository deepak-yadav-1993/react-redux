import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import APIService, { restCall } from '../../shared/ApiCallService';
import { SheetsData } from '../../shared/Type';
import { transformErrorMessage } from '../../components/ErrorComponent';
import { errorOcurred } from './errorSlice';
import { selectAccessToken } from './userSlice';

const emptyRecord = (element: string) => element === '';
const filterData = ({ header, data }: SheetsData) => {
  const transformedData = data.map((row: any) => {
    return row.map((item: any) => {
      const record = item.replace('$', '');
      return record.replace(',', '');
    });
  });

  const result = transformedData.filter(
    (row: any) => row.length === header.length && !row.some(emptyRecord)
  );

  // Send record of last 12 months year
  return result.length > 12
    ? result.slice(result.length - 12, result.length)
    : result;
};

type SheetData = {
  state: 'loading' | 'failed' | 'idle';
  groupId: string;
  fileId: string;
  data: any[];
  header: any[];
};
const initialState: SheetData = {
  groupId: '1UhEWbuFZGbAP1UIZ0PBxE7UgoW2bjOSnlSJuBSOnemE',
  fileId: 'SideHustleTestData',
  state: 'idle',
  data: [],
  header: []
};

export const getSheetData = createAsyncThunk(
  'sheetData/getSheetData',
  async (
    { groupId, fileId }: { groupId: string; fileId: string },
    { dispatch, rejectWithValue, getState }
  ) => {
    const accessToken = selectAccessToken(getState() as RootState);
    const apiService = new APIService(accessToken);
    const apiCall = () => {
      return apiService.getSheetData({
        spreadSheetId: groupId,
        sheetId: fileId
      });
    };

    const [res, err] = (await restCall(apiCall)) as any;
    if (res) {
      const [header, ...data] = res?.data?.values ?? [];
      const changedData = filterData({ header, data });
      return { header, data: changedData };
    }
    if (err !== null) {
      dispatch(errorOcurred(transformErrorMessage(err)?.message));
      rejectWithValue({ header: [], data: [] });
    }
    return { header: [], data: [] };
  }
);

const sheetDataSlice = createSlice({
  name: 'sheetData',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getSheetData.fulfilled, (state, action) => {
      const { header, data } = action.payload;
      state.header = header;
      state.data = data;
    });
  }
});

export const selectSheetGID = (state: RootState) => state.sheetData.groupId;
export const selectFileId = (state: RootState) => state.sheetData.fileId;
export const selectChartData = (state: RootState) => state.sheetData.data;
export const selectChartHeader = (state: RootState) => state.sheetData.header;

export default sheetDataSlice.reducer;
