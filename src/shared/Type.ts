import { type } from "os";

export type ErrorType = {
  code: number;
  message: string;
};

export type SheetsData = {
  header: [string];
  data: [string];
};
