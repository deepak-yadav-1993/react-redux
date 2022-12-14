export type ErrorType = Readonly<{
  index?: number;
  code?: number;
  message: string;
}>;

export type SheetsData = Readonly<{
  header: [string];
  data: [string];
}>;

export type dbState = Readonly<{
  loggedIn: boolean;
  userData: object;
  isLoading: boolean;
  header: [any];
  data: [any];
  speadSheetId: string;
  sheetId: string;
  errors: [ErrorType];
}>;

export type ChartProps = {
  height: number;
  width: number;
};

export type LoadingStates = 'loading' | 'failed' | 'idle';
export type NavLocations = 'weather' | 'finances' | 'setup';
